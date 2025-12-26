import Image from "next/image";
import { PropsWithChildren } from "react";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex justify-start">
      <Image
        className="object-cover fixed inset-0 -z-10"
        src="/images/background.png"
        alt="Background"
        fill
        priority
      />
      {children}
    </div>
  );
}
