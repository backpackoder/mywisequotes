import Image from "next/image";
import Link from "next/link";
import React from "react";

// Types
import { DiscoverQuotesAndAuthorsItemProps, DiscoverQuotesAndAuthorsProps } from "@/types/props";

export function DiscoverQuotesAndAuthors({ h2, text }: DiscoverQuotesAndAuthorsProps) {
  return (
    <article className="flex flex-wrap items-center justify-evenly gap-8 w-full bg-[#f7f7f7] p-8">
      <Item theme="Quotes" h2={h2} text={text} />
      <Item theme="Authors" h2={h2} text={text} />
    </article>
  );
}

function Item({ theme, h2, text }: DiscoverQuotesAndAuthorsItemProps) {
  const { catchphrase, link } = text;

  return (
    <div className="group flex flex-col items-center justify-center gap-2 max-w-sm bg-[#e6e6e6] p-4 border-2 rounded-lg shadow-xl">
      {h2 && <h2>{theme}</h2>}

      <h3>
        {catchphrase.before} {theme.toLowerCase()} {catchphrase.after}
      </h3>

      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={`/${theme.toLowerCase()}.jpg`}
          alt={theme}
          fill={true}
          sizes="100%"
          className="object-cover rounded-lg duration-300 group-hover:scale-110"
        />
      </div>

      <Link
        href={`/${theme.toLowerCase()}`}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        {link.before} {theme.toLowerCase()} {link.after}
      </Link>
    </div>
  );
}
