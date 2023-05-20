"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useReducer, useState } from "react";

// Types
import { Authors, Quotes } from "@/types/API";
import { Params } from "@/types/params";

// Utils
import { getData } from "@/utils/getData";

// Types
import { SearchbarProps } from "@/types/searchbar";

// Commons
import { API_URL } from "@/commons/commons";

export default function Searchbar({ type }: SearchbarProps) {
  const [searchQuote, setSearchQuote] = useState<Quotes | null>(null);
  const [searchAuthor, setSearchAuthor] = useState<Authors | null>(null);

  const url = useMemo(() => {
    switch (type) {
      case "quotes":
        return API_URL.SEARCH_QUOTES;

      case "authors":
        return API_URL.SEARCH_AUTHORS;

      default:
        throw new Error(`Invalid type at Searchbar: ${type}`);
    }
  }, [type]);

  const params: Params =
    type === "quotes"
      ? {
          url,

          query: "",
          fields: "quote,author",
        }
      : {
          url,

          query: "",
        };

  const [state, dispatch] = useReducer(reducer, params);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "query":
        return { ...state, query: action.payload };

      default:
        throw new Error(`Invalid action type at SearchAuthor: ${(action.type, action.payload)}}`);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "query", payload: e.target.value });
  }

  useEffect(() => {
    async function fetchQuotes() {
      const data: Quotes = await getData(state);
      setSearchQuote(data);
    }

    async function fetchAuthors() {
      const data: Authors = await getData(state);
      setSearchAuthor(data);
    }

    state.query !== "" && (type === "quotes" ? fetchQuotes() : fetchAuthors());
  }, [params.query, state, type]);

  return (
    <div className="relative">
      <input
        type="text"
        id="text"
        placeholder="Search..."
        value={state.query ?? ""}
        className="border-2"
        onChange={(e) => handleInputChange(e)}
      />

      {state.query !== "" &&
        ((searchQuote && searchQuote.results.length > 0) ||
          (searchAuthor && searchAuthor.results.length > 0)) && (
          <div className="absolute flex flex-col gap-2 bg-gray-200 p-2 w-full border-2">
            {searchQuote
              ? searchQuote.results.map((result, index) => {
                  return (
                    <div key={index}>
                      <Link href={`/${type}/${result._id}`}>{result.content} </Link>
                      <Link href={`/authors/${result.authorSlug}`}>
                        <small>({result.author})</small>
                      </Link>
                    </div>
                  );
                })
              : null}

            {searchAuthor
              ? searchAuthor.results.map((result, index) => {
                  return (
                    <Link key={index} href={`/${type}/${result.slug}`}>
                      {result.name}{" "}
                      <small>
                        ({result.quoteCount} {result.quoteCount === 1 ? "quote" : "quotes"})
                      </small>
                    </Link>
                  );
                })
              : null}
          </div>
        )}
    </div>
  );
}
