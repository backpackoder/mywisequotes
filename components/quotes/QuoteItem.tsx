import Link from "next/link";

// Components
import { QuoteContainer } from "./QuoteContainer";
import { QuoteIcons } from "./QuoteIcons";
import { AuthorImg } from "./AuthorImg";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { QuoteItemProps } from "@/types/props";

export function QuoteItem({ quote }: QuoteItemProps) {
  const creator = "My wise quotes";
  console.log("quote: ", quote);

  return quote ? (
    <QuoteContainer>
      <QuoteIcons quote={quote} />

      <Link href={ROUTES.QUOTE(quote.id)} className="cursor-pointer hover:text-[#a3a3a3]">
        {`- "${quote.translations[0].content}."`}
      </Link>

      <AuthorImg author={quote.author.translations[0].name} image={{ width: 100 }} />

      <Link href={ROUTES.AUTHOR(quote.authorId)} className="cursor-pointer hover:text-[#a3a3a3]">
        - {quote.author.translations[0].name}
      </Link>

      <p className="text-xs italic">
        Added by{" "}
        <Link href={ROUTES.USER(creator)} className="font-semibold">
          {creator}
        </Link>
      </p>
    </QuoteContainer>
  ) : null;
}
