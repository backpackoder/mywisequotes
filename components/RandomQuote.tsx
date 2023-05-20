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

  const data: Quote[] = await getData(params);
  console.log("data", data);

  return data && <QuoteItem data={data[0]} />;
}
