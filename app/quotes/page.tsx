"use client";

import { useEffect, useMemo, useReducer, useState } from "react";

// Components
import { NoResultsFound } from "@/components/NoResultsFound";
import { Navbar } from "@/components/navbars/Navbar";
import { Pagination } from "@/components/Pagination";
import { QuoteItem } from "@/components/quotes/QuoteItem";

// Commons
import { FILTERS } from "@/commons/commons";

// Types
import { Params } from "@/types/params";
import { PrismaQuote, API, ManyData } from "@/types/prisma";
import { DispatchQuotesAndAuthors } from "@/types/authors";

export default function Quotesaze() {
  const [quotes, setQuotes] = useState<API<ManyData<PrismaQuote>>>(null);

  const params: Params = useMemo(() => {
    return {
      page: 1,
      limit: 20,
      sortBy: FILTERS.DEFAULT,
      order: "asc",
      language: "en",
      author: FILTERS.DEFAULT,
      tag: FILTERS.DEFAULT,
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, params);

  function reducer(state: Params, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  useEffect(() => {
    async function fetchQuotes() {
      const res = await fetch(`/api/quotes/queries/${Object.values(params).join("/")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data) => setQuotes(data));
    }

    fetchQuotes();
  }, [params]);

  return (
    quotes && (
      <section className="flex flex-col gap-2">
        <Navbar type="quotes" totalCount={quotes.count} dispatch={dispatch} />

        {quotes.data.length > 0 ? (
          <>
            <Pagination data={quotes.data} state={state} dispatch={dispatch} />

            <article className="flex flex-col gap-2">
              {quotes.data.map((quote, index) => {
                return (
                  <div key={index}>
                    <QuoteItem quote={quote} />
                  </div>
                );
              })}
            </article>

            <Pagination data={quotes.data} state={state} dispatch={dispatch} />
          </>
        ) : (
          <NoResultsFound type="quotes" />
        )}
      </section>
    )
  );
}
