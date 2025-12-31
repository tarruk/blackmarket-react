"use client";

import { FaBars, FaTimes } from "react-icons/fa";

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md border border-white p-2 text-white hover:bg-white/10 transition-all"
      aria-label="Toggle menu"
    >
      {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
    </button>
  );
}
