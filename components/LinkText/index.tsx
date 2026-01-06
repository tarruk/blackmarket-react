import { cn } from "@/utils";
import Link from "next/link";

import { AnchorHTMLAttributes, PropsWithChildren } from "react";

interface LinkTextProps
  extends PropsWithChildren, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const LinkText = (props: LinkTextProps) => {
  return (
    <Link
      href={props.href}
      className={cn("text-blue-500 font-semibold", props.className)}
    >
      {props.children}
    </Link>
  );
};

export default LinkText;
