"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import Logo from "./Logo";
import { Items } from "@/types/navbar";

// Types
import { NavbarItemsProps } from "@/types/props";

export default function NavbarMain() {
  const isLogged = false;

  const items: {
    [key: string]: Items[];
  } = {
    main: [
      { label: "Home", path: "/" },
      { label: "Quotes", path: "/quotes" },
      { label: "Authors", path: "/authors" },
    ],
    login: [
      { label: "Log in", path: "/api/auth/login", func: undefined },
      { label: "Sign up", path: "/signUp", func: undefined },
    ],
    profile: [
      { label: "My profile", path: "/profile" },
      { label: "My quotes", path: "/myquotes" },
      { label: "My authors", path: "/myauthors" },
      { label: "Log out", path: "/api/auth/logout", func: undefined },
    ],
  };
  const { main, login, profile } = items;

  return (
    <nav className="flex flex-wrap justify-evenly p-2 border-4">
      <Logo />

      <NavBarItem items={main} />
      <NavBarItem items={isLogged ? profile : login} />
    </nav>
  );
}

function NavBarItem({ items }: NavbarItemsProps) {
  const pathname = usePathname();

  return (
    <ul className="flex gap-x-2">
      {items.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <li key={index} className="flex items-center p-2 cursor-pointer">
            <Link
              href={item.path}
              className={`${isActive ? "text-blue-500" : "text-black"} text-center`}
              onClick={() => item.func}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
