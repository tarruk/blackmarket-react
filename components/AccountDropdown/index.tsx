"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative inline-block text-left"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          inline-flex items-center gap-2
          rounded-md border
          px-4 py-2 text-sm text-white
          hover:bg-white/10 transition-all
          whitespace-nowrap shrink-0
        "
      >
        My Account {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-44
            rounded-md bg-zinc-900
            shadow-lg ring-1 ring-black/30
            z-50
          "
        >
          <Item href="/profile">Profile</Item>
          <Item href="/orders">Orders</Item>
          <div className="h-px bg-white/10 my-1" />
          <Item onClick={() => alert("logout")}>Logout</Item>
        </div>
      )}
    </div>
  );
}

function Item({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "block w-full px-4 py-2 text-sm text-white hover:bg-white/10 text-left";

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
