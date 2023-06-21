import Link from "next/link";

// Components
import Logo from "./Logo";

// Commons
import { ROUTES } from "@/commons/commons";
const { HOME, QUOTES, AUTHORS, ABOUT } = ROUTES;

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-8 p-4 border-t-4">
      <Logo m="0" width={25} height={25} />

      <Link href={HOME}>Home</Link>

      <Link href={QUOTES}>Quotes</Link>

      <Link href={AUTHORS}>Authors</Link>

      <Link href={ABOUT}>About</Link>
    </footer>
  );
}
