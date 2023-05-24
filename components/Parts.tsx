import Image from "next/image";
import Link from "next/link";
import React from "react";

// Types
import { PartsItemProps } from "@/types/props";

export default function Parts() {
  return (
    <article className="flex flex-wrap items-center justify-evenly gap-8 w-full bg-[#f7f7f7] p-8">
      <PartsItem theme="Quotes" />
      <PartsItem theme="Authors" />
    </article>
  );
}

function PartsItem({ theme }: PartsItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-lg">
      <h2>{theme}</h2>
      <p>Discover {theme.toLowerCase()} from our community.</p>

      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={`/${theme.toLowerCase()}.jpg`}
          alt={theme}
          fill={true}
          sizes="100%"
          className="object-cover rounded-lg cursor-pointer hover:scale-110"
        />
      </div>

      <Link
        href={`/${theme.toLowerCase()}`}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        I discover the {theme.toLowerCase()}
      </Link>
    </div>
  );
}
