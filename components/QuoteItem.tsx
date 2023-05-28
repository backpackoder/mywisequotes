import Link from "next/link";
import React from "react";

// Components
import { FavIcon } from "./FavIcon";
import AuthorImg from "./AuthorImg";

// Types
import { QuoteItemProps } from "@/types/props";

export async function QuoteItem({ quote }: QuoteItemProps) {
  return quote ? (
    <div
      className="relative flex flex-col items-center gap-2 bg-[#04f7ff4b] italic p-8 border-1 border-black rounded-lg
      duration-300 hover:bg-[#04f7ff93]"
    >
      <FavIcon />

      <Link href={`/quotes/${quote._id}`} className="cursor-pointer hover:text-[#a3a3a3]">
        {`"${quote.content}"`}
      </Link>

      {/* @ts-expect-error Async Server Component */}
      <AuthorImg author={{ name: quote.author }} width={100} />

      <Link href={`/authors/${quote.authorSlug}`} className="cursor-pointer hover:text-[#a3a3a3]">
        - {quote.author}
      </Link>
    </div>
  ) : null;
}
