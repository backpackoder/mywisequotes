// Components
import { QuoteItem } from "./QuoteItem";

// Types
import { Params } from "@/types/params";
import { Quote } from "@/types/API";

// Hooks
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";

export default async function RandomQuote() {
  const params: Params = {
    url: API_URL.QUOTES_RANDOM,

    limit: 1,
  };

  const quote: Quote[] = await getData(params);

  return quote ? (
    <article className="flex items-center justify-center w-full p-4">
      <QuoteItem quote={quote[0]} />
    </article>
  ) : null;
}
