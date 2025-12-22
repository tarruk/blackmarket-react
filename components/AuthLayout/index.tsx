import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-screen w-full flex flex-col items-center md:items-start md:pl-40 justify-center gap-8">
      {children}
    </main>
  );
}
