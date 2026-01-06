"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AccountDropdown } from "../AccountDropdown";
import CartButton from "../CartButton";
import Logo from "../Logo";
import Searchbar from "../SearchBar";
import MenuButton from "../MenuButton";

interface NavBarProps {
  onSearch: (query: string) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", onClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="z-100 top-0 left-0 right-0 sticky bg-black">
      <div className="hidden sm:flex sm:gap-4 justify-between items-center max-w-7xl mx-auto gap-4 py-3 px-6 lg:px-20">
        <Logo className="text-white" />
        <div className="flex gap-4 items-center">
          <Searchbar onSearch={onSearch} />
          <AccountDropdown />
          <CartButton />
        </div>
      </div>

      <div className="flex w-full flex-col sm:hidden gap-2 justify-between">
        <div className="flex flex-row justify-between items-center w-full py-3 px-6">
          <Logo className="text-white" />
          <MenuButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
        <div className="w-full flex px-10 py-2 bg-search-bar-background justify-center">
          <Searchbar onSearch={onSearch} />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            ref={menuRef}
            className={`fixed right-0 top-0 h-full w-64 bg-black border-l border-white/20 shadow-xl ${mobileMenuOpen ? "animate-slide-in-right" : "animate-slide-out-right"}`}
          >
            <div className="flex flex-col p-4 gap-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-semibold">Menu</h2>
                <MenuButton
                  isOpen={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(false)}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="border-t border-white/10 pt-4">
                  <AccountDropdown />
                </div>
                <div className="border-t border-white/10 pt-4">
                  <CartButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
