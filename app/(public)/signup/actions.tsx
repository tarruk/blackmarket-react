"use server";

import { redirect } from "next/navigation";

export type SignupState = {
  error?: string;
  success?: boolean;
};

export async function signupAction(
  _: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return { error: "Invalid form submission" };
  }

  if (
    !email.trim() ||
    !password.trim() ||
    !name.trim() ||
    !confirmPassword.trim()
  ) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords don't match" };
  }

  const res = await fetch(`${process.env.APP_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      password,
      confirmPassword,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    return {
      error: data?.error ?? "Signup failed",
    };
  }
  return { success: true };
}
