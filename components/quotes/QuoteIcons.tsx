"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit, FaHeart } from "react-icons/fa";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { PrismaQuote } from "@/types/prisma";

export type QuoteIconsProps = {
  quote: PrismaQuote;
};

export function QuoteIcons({ quote }: QuoteIconsProps) {
  return (
    <div className="flex items-center justify-end gap-2 w-full">
      <EditIcon quote={quote} />
      <FavIcon />
    </div>
  );
}

function EditIcon({ quote }: QuoteIconsProps) {
  const router = useRouter();

  function redirect() {
    router.push(ROUTES.QUOTE_EDIT(quote.id));
  }

  return (
    <FaEdit
      size="1.5rem"
      color="lightgrey"
      className="duration-150 cursor-pointer hover:scale-125"
      onClick={() => redirect()}
    />
  );
}

function FavIcon() {
  const [isFav, setIsFav] = useState(false);

  function addedToFavs(e: React.MouseEvent<SVGElement, MouseEvent>) {
    e.stopPropagation();
    setIsFav(!isFav);
  }

  return (
    <FaHeart
      size="1.5rem"
      color={isFav ? "red" : "lightgrey"}
      className="duration-150 cursor-pointer hover:scale-125"
      onClick={(e) => addedToFavs(e)}
    />
  );
}
