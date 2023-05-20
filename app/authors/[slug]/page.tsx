import Link from "next/link";
import React from "react";

// Types
import { Author, Authors, Quotes } from "@/types/API";
import { Params } from "@/types/params";

// Utils
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";
import { QuoteItem } from "@/components/QuoteItem";

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const authorsParams: Params = {
    url: API_URL.AUTHORS,
    slug,
  };

  const quotesParams: Params = {
    url: API_URL.QUOTES,
    author: slug,
  };

  const author: Authors = await getData(authorsParams);
  const quotes: Quotes = await getData(quotesParams);

  return author.results.length === 1 && quotes ? (
    <section>
      <h2>{author.results[0].name}</h2>
      <p>{author.results[0].description}</p>

      <h3>Biography:</h3>
      <p>{author.results[0].bio}</p>
      <a href={author.results[0].link} target="_blank" className="text-blue-500">
        <small>Read more on Wikipedia</small>
      </a>

      <h3>Quotes ({author.results[0].quoteCount}):</h3>
      <div className="flex flex-col gap-4">
        {quotes.results.map((result, index) => {
          return <QuoteItem key={index} data={result} />;
        })}
      </div>
    </section>
  ) : (
    <MoreThanOneResult author={author} />
  );
}

function MoreThanOneResult({ author }: { author: Authors }) {
  return (
    <section>
      {author.results.map((result: Author, index: number) => {
        return (
          <div key={index}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>

            <h3>Biography:</h3>
            <p>{result.bio}</p>
          </div>
        );
      })}
    </section>
  );
}
