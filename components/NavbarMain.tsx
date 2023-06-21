"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// Components
import Logo from "./Logo";
import { SignInButton } from "./AuthButtons";

// Commons
import { ROUTES } from "@/commons/commons";
const { HOME, QUOTES, AUTHORS, ABOUT } = ROUTES;

// Types
import { NavbarItemsProps } from "@/types/props";

export default function NavbarMain() {
  const routes = [
    { label: "Home", path: HOME },
    { label: "Quotes", path: QUOTES },
    { label: "Authors", path: AUTHORS },
    { label: "About", path: ABOUT },
  ];

  return (
    <nav className="flex flex-wrap justify-evenly border-4 z-50">
      <Logo width={35} height={35} />

      <div className="flex items-center gap-4">
        <NavBarItem items={routes} />
        <SignInButton />
      </div>
    </nav>
  );
}

function NavBarItem({ items }: NavbarItemsProps) {
  const pathname = usePathname();

  return (
    <ul className="flex gap-x-2 h-full">
      {items.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <li
            key={index}
            className="flex items-center p-2 cursor-pointer duration-500 hover:bg-yellow-200"
          >
            <Link
              href={item.path}
              className={`${isActive ? "text-blue-500" : "text-black"} text-center`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
