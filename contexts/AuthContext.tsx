"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/user.types";
import { LoginResponse, AuthContextType } from "@/types/auth.types";
import { authStorage } from "@/utils/auth-storage";
import { ApiError } from "@/utils/api-error";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkAuth = async () => {
    try {
      setIsLoading(true);

      const accessToken = authStorage.getAccessToken();

      if (!accessToken) {
        setUser(null);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        {
          method: "GET",
          headers: authStorage.getAuthHeaders(),
        },
      );

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        setUser(null);
        authStorage.clearTokens();
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setUser(null);
      authStorage.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/sign_in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      },
    );

    if (!response.ok) {
      throw await ApiError.fromResponse(response);
    }

    authStorage.saveTokens(response.headers);

    const data: LoginResponse = await response.json();

    await checkAuth();
  };

  const signup = async (
    email: string,
    name: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email,
            name,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      },
    );

    if (!response.ok) {
      throw await ApiError.fromResponse(response);
    }

    authStorage.saveTokens(response.headers);

    await checkAuth();
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/sign_out`, {
        method: "DELETE",
        headers: authStorage.getAuthHeaders(),
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      authStorage.clearTokens();
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
