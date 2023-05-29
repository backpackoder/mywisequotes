import Image from "next/image";
import Link from "next/link";
import React from "react";

// Types
import { LogoProps } from "@/types/props";

export default function Logo({ m = "2", width = 50, height = 50 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center m-${m}`}>
      <Image
        src="/logo.png"
        alt="/"
        width={width}
        height={height}
        className="w-auto h-auto cursor-pointer"
      />
    </Link>
  );
}
