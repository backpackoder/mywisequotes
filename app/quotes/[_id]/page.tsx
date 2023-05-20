"use client";

import React, { useEffect, useState } from "react";

// Types
import { Quote } from "@/types/API";

// Commons
import { API_URL } from "@/commons/commons";
import { QuoteItem } from "@/components/QuoteItem";

export default function Quote({ params }: { params: { _id: string } }) {
  const { _id } = params;

  const [data, setData] = useState<Quote | null>(null);

  useEffect(() => {
    const quotesParams = {
      url: `${API_URL.QUOTES}/${_id}`,
    };

    async function fetchData() {
      fetch(quotesParams.url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }

    fetchData();
  }, [_id]);

  return (
    data && (
      <section className="p-2 border-2">
        <QuoteItem data={data} />
      </section>
    )
  );
}
