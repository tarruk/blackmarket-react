"use client";

import AuthLayout from "@/components/AuthLayout";
import Card from "@/components/Card";
import Form from "@/components/Form";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signupAction, SignupState } from "./actions";
import Link from "next/link";
import LinkText from "@/components/LinkText";

function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      fullWidth
      isLoading={pending}
      className="mb-4"
    >
      {pending ? "Signing up..." : "Sign up"}
    </Button>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useActionState<SignupState, FormData>(
    signupAction,
    {},
  );

  const SuccessModal = () => {
    return (
      <Modal isOpen={state.success === true}>
        <div className="flex flex-col items-center text-center p-4 w-[278px]">
          <img
            width={173}
            height={30}
            src="/images/logo.svg"
          />

          <img
            src="/images/success.svg"
            className="h-auto w-auto"
          />

          <p className="text-gray-600 mb-6">
            We’ve just sent you an email to confirm your sign up!
          </p>

          <Link
            href="/login"
            className="w-full"
          >
            <Button
              variant="primary"
              size="md"
              fullWidth
            >
              Go to Login
            </Button>
          </Link>
        </div>
      </Modal>
    );
  };
  return (
    <AuthLayout>
      <Card>
        <Form action={formAction}>
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

          {state.error && <p className="text-red-600 pb-4"> {state.error}</p>}
          <SignupButton />
          <p className="text-center">
            By signing up, you accept the{" "}
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
      <SuccessModal />
    </AuthLayout>
  );
}
