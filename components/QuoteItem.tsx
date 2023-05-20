"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { FavIcon } from "./FavIcon";

export function QuoteItem({ data }: any) {
  const router = useRouter();

  return (
    <div
      className="relative flex flex-col items-center gap-2 bg-[#04f7ff4b] p-8 border-1 border-black rounded-lg cursor-pointer"
      onClick={() => router.push(`/quotes/${data._id}`)}
    >
      <FavIcon />

      <p>{`"${data.content}"`}</p>

      <Link onClick={(e) => e.stopPropagation()} href={`/authors/${data.authorSlug}`}>
        - {data.author}
      </Link>
    </div>
  );
}
