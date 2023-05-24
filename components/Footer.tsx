import Link from "next/link";
import React from "react";

// Components
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-8 p-4 border-t-4">
      <Logo m={0} width={25} height={25} />

      <Link href="/">Homepage</Link>

      <Link href="/quotes">Quotes</Link>

      <Link href="/authors">Authors</Link>

      <Link href="/profile">Profile</Link>
    </footer>
  );
}
