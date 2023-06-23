"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

// Components
import Navbar from "@/components/navbars/Navbar";
import Pagination from "@/components/Pagination";
import AuthorImg from "@/components/quotes/AuthorImg";

// Utils
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";

// Types
import { Params } from "@/types/params";
import { Authors } from "@/types/API";
import { DispatchQuotesAndAuthors } from "@/types/authors";

export default function Authors() {
  const params: Params = {
    url: API_URL.AUTHORS,

    page: 1,
    limit: 20,
    slug: "",
    sortBy: "",
    order: "asc",
    tags: "",
  };

  const [authors, setAuthors] = useState<Authors | null>(null);

  const [state, dispatch] = useReducer(reducer, params);

  function reducer(state: Params, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  useEffect(() => {
    getData(state).then((data) => setAuthors(data));
  }, [state]);

  return authors ? (
    <section className="flex flex-col gap-2">
      <Navbar type="authors" totalCount={authors.totalCount} dispatch={dispatch} />

      <Pagination data={authors} state={state} dispatch={dispatch} />

      <article className="flex flex-wrap justify-center gap-8">
        {authors.results.map((author, index) => {
          return (
            <div
              key={index}
              className="group flex flex-col items-center bg-blue-200 p-4  rounded-lg duration-300 hover:bg-blue-300"
            >
              <Link href={`/authors/${author.slug}`} className="text-2xl">
                {author.name}
              </Link>
              <small>
                ({author.quoteCount} {author.quoteCount === 1 ? "quote" : "quotes"})
              </small>

              <div className="flex items-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
                <AuthorImg author={author.name} />
              </div>

              <Link
                href={`/authors/${author.slug}`}
                className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
              >
                VIEW INFOS
              </Link>
            </div>
          );
        })}
      </article>

      <Pagination data={authors} state={state} dispatch={dispatch} />
    </section>
  ) : null;
}
