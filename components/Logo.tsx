import Image from "next/image";
import Link from "next/link";
import React from "react";

export type LogoProps = {
  m?: number;
  width?: number;
  height?: number;
};

export default function Logo({ m = 2, width = 50, height = 50 }: LogoProps) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="/"
        width={width}
        height={height}
        className={`w-auto h-auto cursor-pointer m-${m}`}
      />
    </Link>
  );
}
