import Link from "next/link";

// Components
import { FavIcon } from "./FavIcon";
import AuthorImg from "./AuthorImg";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { QuoteItemProps } from "@/types/props";

export function QuoteItem({ quote }: QuoteItemProps) {
  return quote ? (
    <div
      className="relative flex flex-col items-center gap-2 bg-[#04f7ff4b] italic p-8 border-1 border-black rounded-lg
      duration-300 hover:bg-[#04f7ff93]"
    >
      <FavIcon />

      <Link href={ROUTES.QUOTE(quote._id)} className="cursor-pointer hover:text-[#a3a3a3]">
        {`"${quote.content}"`}
      </Link>

      <AuthorImg author={quote.author} width={100} />

      <Link href={ROUTES.AUTHOR(quote.authorSlug)} className="cursor-pointer hover:text-[#a3a3a3]">
        - {quote.author}
      </Link>
    </div>
  ) : null;
}
