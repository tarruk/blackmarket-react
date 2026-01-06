import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ImSpinner2 } from "react-icons/im";

const buttonVariants = cva(
  "rounded-lg font-bold transition-colors inline-flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border-2 border-black text-black hover:bg-gray-50",
        outlineInverse: "border-2 border-white text-white hover:bg-gray-50",
        ghost: "text-black hover:bg-gray-100",
        link: "text-blue-500",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  isLoading?: boolean;
}

export default function Button({
  variant,
  size,
  fullWidth,
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${buttonVariants({
        variant,
        size,
        fullWidth,
      })} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <ImSpinner2 className={spinnerVariants({ size })} />}
      {children}
    </button>
  );
}
