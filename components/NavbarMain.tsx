import Image from "next/image";

// Types
import { Items } from "@/types/navbar";
import Link from "next/link";

const items = {
  main: [
    { label: "Home", path: "/" },
    { label: "Quotes", path: "quotes" },
    { label: "Authors", path: "authors" },
  ],
  login: [
    { label: "Sign in", path: "signIn" },
    { label: "Sign up", path: "signUp" },
  ],
  profile: [
    { label: "My profile", path: "profile" },
    { label: "My quotes", path: "myquotes" },
    { label: "My authors", path: "myauthors" },
    { label: "Sign out", path: "/" },
  ],
};
const { main, login, profile } = items;

export default function NavbarMain() {
  const isLogged = false;

  return (
    <nav className="flex justify-evenly border-4">
      <Link href="/">
        <Image src="/logo.png" alt="/" width="50" height="50" className="my-2 cursor-pointer" />
      </Link>

      <Items items={main} />
      <Items items={isLogged ? profile : login} />
    </nav>
  );
}

function Items({ items }: { items: Items[] }) {
  return (
    <ul className="flex gap-x-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center p-2 cursor-pointer">
          <Link href={item.path}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
