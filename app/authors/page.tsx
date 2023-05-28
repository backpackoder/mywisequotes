// "use client";

import Link from "next/link";

// Components
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import AuthorImg from "@/components/AuthorImg";

// Types
import { Params } from "@/types/params";

// Utils
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";
import { Authors } from "@/types/API";

export default async function Authors() {
  const params: Params = {
    url: API_URL.AUTHORS,

    slug: "",
    sortBy: "",
    order: "",
    limit: 20,
    page: 1,
  };

  const authors: Authors = await getData(params);

  return (
    <section>
      <Navbar type="authors" data={authors} />

      {/* <Pagination data={data} state={0} dispatch={() => {}} /> */}

      <article className="flex flex-wrap items-stretch justify-center gap-8 my-2">
        {authors.results.map((author, index) => {
          return (
            <div
              key={index}
              className="group flex flex-col items-center bg-blue-200 p-4  rounded-lg duration-300 hover:bg-blue-300"
            >
              <Link href={`/authors/${author.slug}`} className="text-2xl">
                {author.name}
              </Link>
              <small>
                ({author.quoteCount} {author.quoteCount === 1 ? "quote" : "quotes"})
              </small>

              <div className="flex items-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
                {/* @ts-expect-error Async Server Component */}
                <AuthorImg author={{ name: author.name }} />
              </div>

              <Link
                href={`/authors/${author.slug}`}
                className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
              >
                VIEW INFOS
              </Link>
            </div>
          );
        })}
      </article>
    </section>
  );
}
