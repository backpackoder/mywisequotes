// Commons
import { API_URL, ROUTES } from "@/commons/commons";
import { QuoteItem } from "@/components/quotes/QuoteItem";

// Types
import { Quote } from "@/types/API";
import Link from "next/link";

export default async function Quote({ params }: { params: { _id: string } }) {
  const { _id } = params;

  const quotesParams = {
    url: `${API_URL.QUOTES}/${_id}`,
  };

  async function fetchData() {
    const response = await fetch(quotesParams.url);
    const data: any = await response.json();

    return data;
  }

  const data: any = await fetchData();

  return data ? (
    <section className="p-2 border-2">
      <QuoteItem quote={data} />
      <Link href={ROUTES.QUOTE_EDIT(_id)}>HERE</Link>
    </section>
  ) : (
    <p>nope</p>
  );
}
