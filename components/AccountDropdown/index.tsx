"use client";

import { Dropdown, type DropdownItemProps } from "../Dropdown";

export function AccountDropdown() {
  const items: DropdownItemProps[] = [
    { label: "Profile", href: "/profile" },
    { label: "Orders", href: "/orders" },
    { label: "Logout", action: () => alert("logout"), divider: true },
  ];

  return (
    <Dropdown
      label="My Account"
      items={items}
      variant="dark"
      width="md"
    />
  );
}
