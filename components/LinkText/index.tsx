import Link from "next/link";
import { PropsWithChildren } from "react";

interface LinkTextProps extends PropsWithChildren {
  href: string;
}

const LinkText = (props: LinkTextProps) => {
  return (
    <Link
      href={props.href}
      className="text-blue-500 font-semibold"
    >
      {props.children}
    </Link>
  );
};

export default LinkText;
