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
  const quotes = await prisma.quote.findMany({
    include: PRISMA_CALLS.quotes.include,
  });

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return randomQuote ? (
    <article className="flex items-center justify-center w-full p-4">
      <QuoteItem quote={randomQuote} />
    </article>
  ) : null;
}
