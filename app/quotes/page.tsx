// "use client";

import React, { useEffect, useReducer, useState } from "react";

// Components
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import { QuoteItem } from "@/components/QuoteItem";

// Types
import { Quotes } from "@/types/API";
import { Params } from "@/types/params";

// Hooks
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";

export default async function Quotes() {
  // const [data, setData] = useState<Quotes | null>(null);

  const params: Params = {
    url: API_URL.QUOTES,
    maxLength: 1000,
    minLength: 1,
    tags: "",
    author: "",
    sortBy: "",
    order: "",
    limit: 20,
    page: 1,
  };

  // const [state, dispatch] = useReducer(reducer, params);

  // function reducer(state: any, action: any) {
  //   return { ...state, [action.type]: action.payload };
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     const data: Quotes = await getData(state);
  //     setData(data);
  //   }
  //   fetchData();
  // }, [state]);

  // console.log("data", data);

  const data: Quotes = await getData(params);

  return (
    data && (
      <section className="flex flex-col gap-2">
        <Navbar type="quotes" data={data} />

        {/* <Pagination data={data} state={state} dispatch={dispatch} /> */}

        <div className="flex flex-col gap-2">
          {data.results.map((result, index) => {
            return (
              <div key={index}>
                {/* @ts-expect-error Async Server Component */}
                <QuoteItem quote={result} />
                {/* <Test pageTitle={result.authorSlug} /> */}
                {/* <p>{result.content}</p> */}
              </div>
            );
          })}
        </div>

        {/* <Pagination data={data} state={state} dispatch={dispatch} /> */}
      </section>
    )
  );
}
