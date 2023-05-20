"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

// Components
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";

// Types
import { Authors } from "@/types/API";
import { Params } from "@/types/params";

// Utils
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";

export default function Authors() {
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

  return (
    data && (
      <section>
        <Navbar type="authors" data={data} />

        <Pagination data={data} state={state} dispatch={dispatch} />

        <div className="flex flex-col items-start gap-2 border-2">
          {data.results.map((result, index) => {
            return (
              result.quoteCount > 0 && (
                <Link key={index} href={`/authors/${result.slug}`}>
                  {result.name}{" "}
                  <small>
                    ({result.quoteCount} {result.quoteCount === 1 ? "quote" : "quotes"})
                  </small>
                </Link>
              )
            );
          })}
        </div>

        <Pagination data={data} state={state} dispatch={dispatch} />
      </section>
    )
  );
}
