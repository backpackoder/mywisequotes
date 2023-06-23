"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaFeather, FaUserEdit, FaQuestion } from "react-icons/fa";

// Components
import Logo from "../Logo";
import HamburgerMenu from "../menus/HamburgerMenu";
import { SignInButton } from "../AuthButtons";

// Commons
import { ROUTES } from "@/commons/commons";
const { HOME, QUOTES, AUTHORS, ABOUT } = ROUTES;

// Types
import { NavbarItemsProps } from "@/types/props";

export default function NavbarMain() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { icon: <FaHome />, label: "Home", path: HOME },
    { icon: <FaFeather />, label: "Quotes", path: QUOTES },
    { icon: <FaUserEdit />, label: "Authors", path: AUTHORS },
    { icon: <FaQuestion />, label: "About", path: ABOUT },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } gap-8 bg-white text-xl p-2 rounded-ee-xl shadow-xl duration-500 z-50
      sm:static sm:translate-x-0 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:border-4`}
    >
      <HamburgerMenu setIsOpen={setIsOpen} />

      <Logo width={35} height={35} />

      <NavBarItem items={routes} setIsOpen={setIsOpen} />
    </nav>
  );
}

function NavBarItem({ items, setIsOpen }: NavbarItemsProps) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col items-start gap-4 p-2 sm:flex-row sm:p-0">
      {items.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <li key={index} className="w-full" onClick={() => setIsOpen((prev) => !prev)}>
            <Link
              href={item.path}
              className={`flex items-center gap-2 ${
                isActive ? "text-blue-500" : "text-black"
              } text-center`}
            >
              {item.icon} {item.label}
            </Link>
          </li>
        );
      })}
      <li className="w-full">
        <SignInButton setIsOpen={setIsOpen} />
      </li>
    </ul>
  );
}
