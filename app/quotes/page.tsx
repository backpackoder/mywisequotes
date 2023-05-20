"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import { FaHeart } from "react-icons/fa";

// Components
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";

// Types
import { Quotes } from "@/types/API";
import { Params } from "@/types/params";

// Hooks
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";
import { QuoteItem } from "@/components/QuoteItem";

export default function Quotes() {
  const Router = useRouter();
  const [data, setData] = useState<Quotes | null>(null);

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

  const [state, dispatch] = useReducer(reducer, params);

  function reducer(state: any, action: any) {
    return { ...state, [action.type]: action.payload };
  }

  useEffect(() => {
    async function fetchData() {
      const data: Quotes = await getData(state);
      setData(data);
    }
    fetchData();
  }, [state]);

  return (
    data && (
      <section className="flex flex-col gap-2">
        <Navbar type="quotes" data={data} />

        <Pagination data={data} state={state} dispatch={dispatch} />

        <div className="flex flex-col gap-2">
          {data.results.map((result, index) => {
            return <QuoteItem key={index} data={result} />;
          })}
        </div>

        <Pagination data={data} state={state} dispatch={dispatch} />
      </section>
    )
  );
}
