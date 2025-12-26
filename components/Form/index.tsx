import { PropsWithChildren } from "react";

type FormProps = PropsWithChildren & React.FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: FormProps) {
  return (
    <form
      {...props}
      className="flex flex-col w-full"
    >
      {props.children}
    </form>
  );
}
