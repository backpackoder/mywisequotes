"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useReducer, useState } from "react";

// Components
import { NoResultsFound } from "./NoResultsFound";

// Utils
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";

// Types
import { Authors, Quotes } from "@/types/API";
import { Params } from "@/types/params";
import { SearchbarProps } from "@/types/searchbar";
import { DispatchQuotesAndAuthors } from "@/types/authors";

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

  const params: Params = {
    url,

    query: "",
    fields: type === "quotes" ? "quote,author" : undefined,
  };

  const [state, dispatch] = useReducer(reducer, params);

  function reducer(state: Params, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
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
    <div className="relative flex flex-col items-center justify-between gap-2 p-2 z-10">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="William Shakespeare"
        autoComplete="off"
        value={state.query ?? ""}
        className=" max-h-12 p-2 border-2 border-black border-opacity-50 rounded-xl"
        onChange={(e) => handleInputChange(e)}
      />

      {state.query !== "" && (
        <div className="absolute top-full flex flex-col gap-2 bg-sky-200 p-2 w-full border-2">
          {searchQuote && <SearchQuote type={type} searchQuote={searchQuote} />}
          {searchAuthor && <SearchAuthor type={type} searchAuthor={searchAuthor} />}
        </div>
      )}
    </div>
  );
}

function SearchQuote({ type, searchQuote }: { type: string; searchQuote: Quotes }) {
  console.log("searchQuote.results.length", searchQuote.results.length);
  return searchQuote.results.length > 0 ? (
    <>
      {searchQuote.results.map((result, index) => {
        return (
          <div key={index}>
            <Link href={`/${type}/${result._id}`}>{result.content} </Link>
            <Link href={`/authors/${result.authorSlug}`}>
              <small>({result.author})</small>
            </Link>
          </div>
        );
      })}
    </>
  ) : (
    <NoResultsFound type={type} />
  );
}

function SearchAuthor({ type, searchAuthor }: { type: string; searchAuthor: Authors }) {
  return searchAuthor.results.length > 0 ? (
    <>
      {searchAuthor.results.map((result, index) => {
        return (
          <Link key={index} href={`/${type}/${result.slug}`}>
            {result.name}{" "}
            <small>
              ({result.quoteCount} {result.quoteCount === 1 ? "quote" : "quotes"})
            </small>
          </Link>
        );
      })}
    </>
  ) : (
    <NoResultsFound type={type} />
  );
}
