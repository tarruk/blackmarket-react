"use server";

import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form submission" };
  }

  if (!email.trim() || !password.trim()) {
    return { error: "Email and password are required" };
  }

  const res = await fetch(`${process.env.APP_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    return {
      error: data?.error ?? "Login failed",
    };
  }
  redirect("/dashboard");
}
