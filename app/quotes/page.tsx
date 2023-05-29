"use client";

import React, { useEffect, useReducer, useState } from "react";

// Components
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import { QuoteItem } from "@/components/QuoteItem";

// Types
import { Quotes } from "@/types/API";
import { Params } from "@/types/params";
import { DispatchQuotesAndAuthors } from "@/types/authors";

// Hooks
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";
import { NoResultsFound } from "@/components/NoResultsFound";

export default function Quotes() {
  const [quotes, setQuotes] = useState<Quotes | null>(null);

  const params: Params = {
    url: API_URL.QUOTES,
    maxLength: 1000,
    minLength: 1,
    tags: "",
    author: "",
    sortBy: "",
    order: "asc",
    limit: 20,
    page: 1,
  };

  const [state, dispatch] = useReducer(reducer, params);

  function reducer(state: Params, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  useEffect(() => {
    getData(state).then((data) => setQuotes(data));
  }, [state]);

  return quotes ? (
    <section className="flex flex-col gap-2">
      <Navbar type="quotes" totalCount={quotes.totalCount} dispatch={dispatch} />

      {quotes.results.length > 0 ? (
        <>
          <Pagination data={quotes} state={state} dispatch={dispatch} />

          <article className="flex flex-col gap-2">
            {quotes.results.map((quote, index) => {
              return (
                <div key={index}>
                  <QuoteItem quote={quote} />
                </div>
              );
            })}
          </article>

          <Pagination data={quotes} state={state} dispatch={dispatch} />
        </>
      ) : (
        <NoResultsFound type="quotes" />
      )}
    </section>
  ) : null;
}
