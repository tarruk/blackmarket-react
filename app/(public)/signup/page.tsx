"use client";

import AuthLayout from "@/components/AuthLayout";
import Card from "@/components/Card";
import Form from "@/components/Form";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import LinkText from "@/components/LinkText";
import { useAuth } from "@/contexts/AuthContext";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks";
import { useToastContext } from "@/contexts/ToastContext";

export default function SignUpPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const { error, handleError, clearError } = useErrorHandler();
  const { showError, showSuccess } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (
      !email.trim() ||
      !name.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      const errorMsg = "All fields are required";
      handleError(errorMsg);
      showError(errorMsg);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      const errorMsg = "Passwords don't match";
      handleError(errorMsg);
      showError(errorMsg);
      setIsLoading(false);
      return;
    }

    try {
      await signup(email, name, password, confirmPassword);
      showSuccess("Account created successfully! Redirecting...");
      router.push("/dashboard");
    } catch (err) {
      handleError(err);
      showError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <Form onSubmit={handleSubmit}>
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
            label="Full Name"
            name="name"
            type="text"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
          />

          <TextField
            label="Confirm Password"
            name="confirm-password"
            type="password"
          />

          {error && <p className="text-red-600 pb-4"> {error}</p>}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            className="mb-4"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>

          <p className="text-center">
            By signing up, you accept the
            <LinkText href="/data-policy"> Data Policy </LinkText>
            and the
            <LinkText href="/cookies-policy"> Cookies Policy.</LinkText>
          </p>

          <Button
            variant="link"
            type="button"
            size="md"
          >
            I forgot my password
          </Button>
        </Form>
      </Card>
    </AuthLayout>
  );
}
