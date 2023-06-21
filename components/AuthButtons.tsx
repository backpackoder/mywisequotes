"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaHome, FaAddressCard, FaFeather, FaUserEdit, FaSignOutAlt } from "react-icons/fa";

// Commons
import { ROUTES } from "@/commons/commons";
const { HOME, DASHBOARD, MY_QUOTES, MY_AUTHORS, SIGN_OUT } = ROUTES;

export function SignInButton() {
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const list = [
    { icon: <FaHome />, label: "Home", path: HOME },
    { icon: <FaAddressCard />, label: "Dashboard", path: DASHBOARD },
    { icon: <FaFeather />, label: "My quotes", path: MY_QUOTES },
    { icon: <FaUserEdit />, label: "My authors", path: MY_AUTHORS },
    { icon: <FaSignOutAlt />, label: "Sign out", path: SIGN_OUT },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (status === "loading") {
    return <></>;
  }

  if (status === "unauthenticated") {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    session && (
      <div className="relative">
        <Image
          src={session.user?.image ?? "/no-profile-image.webp"}
          alt={session.user?.name ?? "No name"}
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full min-w-max bg-transparent"
          >
            <ul className="flex flex-col gap-y-2 bg-white p-2 border-2 rounded-md shadow-md">
              {list.map((item, index) => (
                <li key={index} className="py-1 px-3 rounded-lg duration-300 hover:bg-blue-300">
                  <Link href={item.path} className="flex items-center gap-2">
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  );
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
