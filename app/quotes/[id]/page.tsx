import { prisma } from "@/lib/prisma";

// Components
import { QuoteItem } from "@/components/quotes/QuoteItem";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

// Types
import { Quote } from "@/types/API";

export default async function Quote({ params }: { params: { id: string } }) {
  const { id } = params;

  const quote = await prisma.quote.findUnique({
    where: {
      id,
    },

    include: PRISMA_CALLS.quotes.include,
  });

  return (
    quote && (
      <section className="p-2 border-2">
        {/* @ts-expect-error Async Server Component */}
        <QuoteItem quote={quote} />
      </section>
    )
  );
}
