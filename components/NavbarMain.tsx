"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

// Components
import { Items } from "@/types/navbar";

// Types
import { ItemsProps } from "@/types/props";

export default function NavbarMain() {
  const { data: session } = useSession();
  console.log("session?.user", session?.user);

  const items: {
    [key: string]: Items[];
  } = {
    main: [
      { label: "Home", path: "/" },
      { label: "Quotes", path: "/quotes" },
      { label: "Authors", path: "/authors" },
    ],
    login: [
      { label: "Log in", path: "/api/auth/login", func: signIn() },
      { label: "Sign up", path: "/signUp", func: signIn() },
    ],
    profile: [
      { label: "My profile", path: "/profile" },
      { label: "My quotes", path: "/myquotes" },
      { label: "My authors", path: "/myauthors" },
      { label: "Log out", path: "/api/auth/logout", func: signOut() },
    ],
  };
  const { main, login, profile } = items;

  return (
    <nav className="flex justify-evenly border-4">
      <Link href="/">
        <Image src="/logo.png" alt="/" width="50" height="50" className="my-2 cursor-pointer" />
      </Link>

      <NavBarItem items={main} />
      <NavBarItem items={session && session.user ? profile : login} />
    </nav>
  );
}

function NavBarItem({ items }: ItemsProps) {
  const pathname = usePathname();

  return (
    <ul className="flex gap-x-2">
      {items.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <li key={index} className="flex items-center p-2 cursor-pointer">
            <Link
              href={item.path}
              className={isActive ? "text-blue-500" : "text-black"}
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
