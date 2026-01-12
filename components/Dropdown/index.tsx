"use client";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export interface DropdownItemProps {
  label: string;
  action?: () => void;
  href?: string;
  divider?: boolean;
}

const buttonVariant = cva(
  "inline-flex items-center gap-2 rounded-md transition-all whitespace-nowrap shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm",
        dark: "border border-white/20 bg-transparent text-white hover:bg-white/10 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const menuVariant = cva("absolute mt-2 rounded-md shadow-lg ring-1 z-50", {
  variants: {
    variant: {
      default: "bg-white ring-black/10",
      dark: "bg-zinc-900 ring-black/30",
    },
    position: {
      left: "left-0",
      right: "right-0",
    },
    width: {
      auto: "w-auto min-w-[160px]",
      sm: "w-32",
      md: "w-44",
      lg: "w-56",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "right",
    width: "auto",
  },
});

const itemVariant = cva(
  "block w-full px-4 py-2 text-sm text-left transition-colors",
  {
    variants: {
      variant: {
        default: "text-gray-900 hover:bg-gray-100",
        dark: "text-white hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface DropdownProps
  extends VariantProps<typeof buttonVariant>, VariantProps<typeof menuVariant> {
  label: string;
  items: DropdownItemProps[];
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

export function Dropdown({
  label,
  items,
  variant = "default",
  position = "right",
  width = "auto",
  className,
  buttonClassName,
  menuClassName,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const menuVariantValue = variant === "dark" ? "dark" : "default";

  return (
    <div
      ref={ref}
      className={cn("relative inline-block text-left", className)}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(buttonVariant({ variant }), buttonClassName)}
      >
        <span>{label}</span>
        {open ? (
          <FaChevronUp className="text-xs" />
        ) : (
          <FaChevronDown className="text-xs" />
        )}
      </button>

      {open && (
        <div
          className={cn(
            menuVariant({ variant: menuVariantValue, position, width }),
            menuClassName,
          )}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider && index > 0 && (
                <div
                  className={cn(
                    "h-px my-1",
                    variant === "dark" ? "bg-white/10" : "bg-gray-200",
                  )}
                />
              )}
              <Item
                href={item.href}
                onClick={() => {
                  item.action?.();
                  setOpen(false);
                }}
                variant={menuVariantValue}
              >
                {item.label}
              </Item>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Item({
  children,
  href,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "dark";
}) {
  const base = itemVariant({ variant });

  if (href) {
    return (
      <Link
        href={href}
        className={base}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={base}
    >
      {children}
    </button>
  );
}
