"use client";

import TextField from "@/components/TextField";
import Link from "next/link";
import Card from "@/components/Card";
import { loginAction, LoginState } from "./actions";
import { useActionState } from "react";
import AuthLayout from "@/components/AuthLayout";

const initialState: LoginState = {};
export default function LoginPage() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginAction,
    initialState,
  );

  return (
    <AuthLayout>
      <Card>
        <form
          className="flex flex-col w-full"
          action={formAction}
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

          {state.error && <p className="text-red-600 pb-4"> {state.error}</p>}
          <button
            type="submit"
            className="bg-black h-10 rounded-lg text-white text-base font-bold mb-8 w-full"
          >
            Log in
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
        <button className="text-black font-bold px-4 py-2 mt-4 border border-black rounded-lg w-full">
          <Link href="/signup">Sign up</Link>
        </button>
      </Card>
    </AuthLayout>
  );
}
