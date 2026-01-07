"use client";

import TextField from "@/components/TextField";
import Link from "next/link";
import Card from "@/components/Card";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center p-8">
            <img
              width={173}
              height={30}
              src="/images/logo.svg"
              className="h-auto"
            />
          </div>

          <TextField
            label="Email"
            name="email"
            type="email"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
          />

          {error && <p className="text-red-600 pb-4"> {error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black h-10 rounded-lg text-white text-base font-bold mb-8 w-full disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
          <button
            type="button"
            className="text-blue-500 font-bold"
          >
            I forgot my password
          </button>
        </form>
      </Card>
      <Card>
        <h2>Don't have an account?</h2>
        <button className="font-bold px-4 py-2 mt-4 border border-black rounded-lg w-full">
          <Link href="/signup">Sign up</Link>
        </button>
      </Card>
    </AuthLayout>
  );
}
