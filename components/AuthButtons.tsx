"use client";

import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaAddressCard, FaFeather, FaUserEdit, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { GoGear } from "react-icons/go";

// Styles
import { styles } from "@/app/assets/styles/styles";

// Commons
import { DEFAULT_PROFILE_IMAGE, ROUTES } from "@/commons/commons";
const { DASHBOARD, MY_QUOTES, MY_AUTHORS, SETTINGS, SIGN_OUT } = ROUTES;

export function SignInButton({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isProfileSubMenuOpen, setIsProfileSubMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const list = [
    { icon: <FaAddressCard />, label: "Dashboard", path: DASHBOARD },
    { icon: <FaFeather />, label: "My quotes", path: MY_QUOTES },
    { icon: <FaUserEdit />, label: "My authors", path: MY_AUTHORS },
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
          src={session.user?.image ?? DEFAULT_PROFILE_IMAGE}
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
              {list.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                  <li
                    key={index}
                    className={`${
                      isActive ? "text-blue-500" : "text-black"
                    } py-1 px-3 rounded-lg duration-300 hover:bg-blue-300`}
                    onClick={() => handleClick()}
                  >
                    <Link href={item.path} className="flex items-center gap-2">
                      {item.icon} {item.label}
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

// <div
//   ref={menuRef}
//   className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full min-w-max bg-transparent"
// >
//   <ul className="flex flex-col gap-y-2 bg-white p-2 border-2 rounded-md shadow-md">
//     {list.map((item, index) => (
//       <li key={index} className="py-1 px-3 rounded-lg duration-300 hover:bg-blue-300">
//         <Link href={item.path} className="flex items-center gap-2">
//           {item.icon} {item.label}
//         </Link>
//       </li>
//     ))}
//   </ul>
// </div>;
