import { prisma } from "@/lib/prisma";

// Components
import { QuoteItem } from "./QuoteItem";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function getPrismaCalls() {
  const prisma_quote_all = prisma.quote.findMany({
    include: PRISMA_CALLS.quotes.include,
  });

  return await prisma_quote_all;
}

export async function RandomQuote() {
  const quote = await prisma.quote.findMany({
    include: PRISMA_CALLS.quotes.include,
  });

  return quote ? (
    <article className="flex items-center justify-center w-full p-4">
      <QuoteItem quote={quote[0]} />
    </article>
  ) : null;
}
