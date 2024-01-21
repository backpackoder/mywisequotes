"use client";

import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaAddressCard,
  FaFeather,
  FaUserEdit,
  FaSignInAlt,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import { GoGear } from "react-icons/go";

// Styles
import { styles } from "@/app/assets/styles/styles";

// Commons
import { IMAGES, ROUTES } from "@/commons/commons";
const { DASHBOARD, MY_QUOTES, QUOTE_ADD, MY_AUTHORS, AUTHOR_ADD, SETTINGS, SIGN_OUT } = ROUTES;

export function SignInButton({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isProfileSubMenuOpen, setIsProfileSubMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const routes = [
    { icon: <FaAddressCard />, label: "Dashboard", path: DASHBOARD },
    { icon: <FaFeather />, label: "My quotes", path: MY_QUOTES },
    { icon: <FaPlus />, label: "Add a quote", path: QUOTE_ADD },
    { icon: <FaUserEdit />, label: "My authors", path: MY_AUTHORS },
    { icon: <FaPlus />, label: "Add an author", path: AUTHOR_ADD },
    { icon: <GoGear />, label: "Settings", path: SETTINGS },
    { icon: <FaSignOutAlt />, label: "Sign out", path: SIGN_OUT },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileSubMenuOpen(false);
      }
    }

    if (isProfileSubMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileSubMenuOpen]);

  if (status === "loading") {
    return <></>;
  }

  if (status === "unauthenticated") {
    return (
      <button className="flex items-center gap-2 w-max" onClick={() => signIn()}>
        <FaSignInAlt /> Sign in
      </button>
    );
  }

  function handleClick() {
    setIsProfileSubMenuOpen((prev) => !prev);
    setIsOpen((prev) => !prev);
  }

  return (
    session && (
      <div className="relative">
        <Image
          src={session.user?.image ?? IMAGES.DEFAULT_PROFILE_IMAGE}
          alt={session.user?.name ?? "No name"}
          width={32}
          height={32}
          className={`${styles.imgSquareCropped} rounded-full cursor-pointer`}
          onClick={() => setIsProfileSubMenuOpen((prev) => !prev)}
        />

        {isProfileSubMenuOpen && (
          <div
            ref={menuRef}
            className="absolute -bottom-2 translate-y-full min-w-max bg-transparent"
          >
            <ul className="flex flex-col gap-y-2 bg-white p-2 border-2 rounded-md shadow-md">
              {routes.map((route, index) => {
                const isActive = pathname === route.path;

                return (
                  <li
                    key={index}
                    className={`${
                      isActive ? "text-blue-500" : "text-black"
                    } py-1 px-3 rounded-lg duration-300 hover:bg-blue-300`}
                    onClick={() => handleClick()}
                  >
                    <Link href={route.path} className="flex items-center gap-2">
                      {route.icon} {route.label}
                    </Link>
                  </li>
                );
              })}
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
