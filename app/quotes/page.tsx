import React from "react";

// Types
import { Quotes } from "@/types/API";
import { Params } from "@/types/params";

// Hooks
import { useGetData } from "@/hooks/getData";

// Commons
import { API_URL } from "@/commons/commons";

export default async function Quotes() {
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

  const data: Quotes = await useGetData(params);
  console.log("data.totalCount", data.totalCount);

  return (
    data && (
      <section className="flex flex-col gap-2">
        <div className="flex justify-center gap-4 p-4 border-2 border-black">
          <div>count: {data.count}</div>
          <div>totalCount: {data.totalCount}</div>
          <div>page: {data.page}</div>
          <div>totalPages: {data.totalPages}</div>
        </div>

        <div className="flex flex-col gap-2">
          {data.results.map((result, index) => {
            return (
              <p key={index}>
                {`"`}
                {result.content}
                {`"`}
                <br />- {result.author}
              </p>
            );
          })}
        </div>
      </section>
    )
  );
}
