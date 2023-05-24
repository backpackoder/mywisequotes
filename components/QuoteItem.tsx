// "use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

// Components
import { FavIcon } from "./FavIcon";
import { Quote } from "@/types/API";
import { getImgFromWiki } from "@/utils/getImgFromWiki";
import AuthorImg from "./AuthorImg";

export type QuoteItemProps = {
  quote: Quote;
};

export async function QuoteItem({ quote }: QuoteItemProps) {
  // const router = useRouter();

  return (
    <div
      className="relative flex flex-col items-center gap-2 bg-[#04f7ff4b] italic p-8 border-1 border-black rounded-lg
      duration-300 hover:bg-[#04f7ff93]"
      // onClick={() => router.push(`/quotes/${quote._id}`)}
    >
      <FavIcon />

      <Link href={`/quotes/${quote._id}`} className="cursor-pointer hover:text-[#a3a3a3]">
        {`"${quote.content}"`}
      </Link>

      {/* @ts-expect-error Async Server Component */}
      <AuthorImg author={{ name: quote.author }} width={100} />

      <Link
        // onClick={(e) => e.stopPropagation()}
        href={`/authors/${quote.authorSlug}`}
        className="cursor-pointer hover:text-[#a3a3a3]"
      >
        - {quote.author}
      </Link>
    </div>
  );
}
