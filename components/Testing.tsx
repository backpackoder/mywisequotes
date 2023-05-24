"use client";

import { Authors } from "@/types/API";
import React, { useEffect, useReducer, useState } from "react";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Link from "next/link";
import AuthorImg from "./AuthorImg";
import { API_URL } from "@/commons/commons";
import { Params } from "@/types/params";
import { getData } from "@/utils/getData";

export function Testing() {
  const [data, setData] = useState<Authors | null>(null);

  const params: Params = {
    url: API_URL.AUTHORS,

    slug: "",
    sortBy: "",
    order: "",
    limit: 20,
    page: 1,
  };

  const [state, dispatch] = useReducer(reducer, params);
  console.log("state", state);

  function reducer(state: any, action: any) {
    return { ...state, [action.type]: action.payload };
  }

  useEffect(() => {
    async function fetchData() {
      const data: Authors = await getData(state);
      setData(data);
    }
    fetchData();
  }, [state]);

  return data ? (
    <>
      <Navbar type="authors" data={data} />

      <Pagination data={data} state={state} dispatch={dispatch} />

      <article className="flex flex-wrap items-stretch justify-center gap-8 my-2">
        {data.results.map((result, index) => {
          return (
            <div
              key={index}
              className="group flex flex-col items-center bg-blue-200 p-4  rounded-lg duration-300 hover:bg-blue-300"
            >
              <Link href={`/authors/${result.slug}`} className="text-2xl">
                {result.name}
              </Link>
              <small>
                ({result.quoteCount} {result.quoteCount === 1 ? "quote" : "quotes"})
              </small>

              <div className="flex items-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
                {/* <AuthorImg author={{ name: result.name }} /> */}
              </div>

              <Link
                href={`/authors/${result.slug}`}
                className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
              >
                VIEW INFOS
              </Link>
            </div>
          );
        })}
      </article>

      <Pagination data={data} state={state} dispatch={dispatch} />
    </>
  ) : (
    <p>Loading...</p>
  );
}
