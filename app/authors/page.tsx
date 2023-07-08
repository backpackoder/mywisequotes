"use client";

import Link from "next/link";
import { useEffect, useMemo, useReducer, useState } from "react";

// Components
import { Navbar } from "@/components/navbars/Navbar";
import { Pagination } from "@/components/Pagination";
import { AuthorImg } from "@/components/quotes/AuthorImg";

// Commons
import { FILTERS } from "@/commons/commons";

// Types
import { Params } from "@/types/params";
import { API, ManyData, PrismaAuthor } from "@/types/prisma";
import { DispatchQuotesAndAuthors } from "@/types/authors";

export default function Authors() {
  const [authors, setAuthors] = useState<API<ManyData<PrismaAuthor>>>(null);

  const params: Params = useMemo(() => {
    return {
      page: 1,
      limit: 20,
      sortBy: FILTERS.DEFAULT,
      order: "asc",
      language: "en",
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
    async function fetchAuthors() {
      const res = await fetch(`api/authors/queries/${Object.values(params).join("/")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data) => setAuthors(data));
    }

    fetchAuthors();
  }, [params]);

  return (
    authors && (
      <section className="flex flex-col gap-2">
        <Navbar type="authors" totalCount={authors.count} dispatch={dispatch} />

        <Pagination data={authors.data} state={state} dispatch={dispatch} />

        <article className="flex flex-wrap justify-center gap-8">
          {authors.data.map((author, index) => {
            const findIndexEnglish = author.translations.findIndex(
              (translation) => translation.language.code === "en"
            );
            const findIndexLanguage =
              author.translations.findIndex(
                (translation) => translation.language.code === state.language ?? "en"
              ) ?? 0;

            return (
              <div
                key={index}
                className="group flex flex-col items-center bg-blue-200 p-4  rounded-lg duration-300 hover:bg-blue-300"
              >
                <Link
                  href={`/authors/${author.translations[findIndexEnglish].name}`}
                  className="text-2xl"
                >
                  {author.translations[findIndexLanguage].name}
                </Link>

                <small>
                  ({author.quotes.length} {author.quotes.length === 1 ? "quote" : "quotes"})
                </small>

                <div className="flex items-center justify-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
                  <AuthorImg author={author.translations[0].name} />
                </div>

                <Link
                  href={`/authors/${author.translations[findIndexEnglish].name}`}
                  className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
                >
                  VIEW INFOS
                </Link>
              </div>
            );
          })}
        </article>

        <Pagination data={authors.data} state={state} dispatch={dispatch} />
      </section>
    )
  );
}
