"use client";
import Image from "next/image";
import React, { useState } from "react";

const items = {
  main: ["Home", "Quotes", "Authors"],
  login: ["Sign in", "Sign up"],
  profile: ["My profile", "My quotes", "My authors", "Sign out"],
};
const { main, login, profile } = items;

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <nav className="flex items-center justify-evenly border-4">
      <Image src="/logo.png" alt="/" width="50" height="50" />

      <Items items={main} />
      <Items items={isLogged ? profile : login} />
    </nav>
  );
}

function Items({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
