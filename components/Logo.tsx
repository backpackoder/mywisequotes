"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Types
import { LogoProps } from "@/types/props";

export function Logo({ m = "2", width = 50, height = 50 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center justify-center m-${m}`}>
      <Image
        src="/logo.png"
        alt="Logo"
        width={width}
        height={height}
        className="w-auto h-auto cursor-pointer"
      />
    </Link>
  );
}
