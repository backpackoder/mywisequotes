import React from "react";

// Types
import { Params } from "@/types/params";
import { Authors } from "@/types/API";

// Hooks
import { useGetData } from "@/hooks/getData";

// Commons
import { API_URL } from "@/commons/commons";
import Link from "next/link";

export default async function Authors() {
  const params: Params = {
    url: API_URL.AUTHORS,
    sortBy: "",
    order: "",
    limit: 20,
    page: 1,
  };

  const data: Authors = await useGetData(params);

  return (
    data && (
      <section>
        <div>count: {data.count}</div>
        <div>totalCount: {data.totalCount}</div>
        <div>page: {data.page}</div>
        <div>totalPages: {data.totalPages}</div>
        <div>lastItemIndex: {data.lastItemIndex}</div>

        <div>
          results:{" "}
          {data.results.map((result, index) => {
            return (
              result.quoteCount > 0 && (
                <Link key={index} href={`/authors/${result.slug}`}>
                  <p key={index}>
                    {result.name} ({result.quoteCount} quotes)
                  </p>
                </Link>
              )
            );
          })}
        </div>
      </section>
    )
  );
}
