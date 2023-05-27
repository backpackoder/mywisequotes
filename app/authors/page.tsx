import Link from "next/link";

// Components
import Navbar from "@/components/Navbar";
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

  const data: Authors = await getData(params);

  return (
    <section>
      <Navbar type="authors" data={data} />

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
                {/* @ts-expect-error Async Server Component */}
                <AuthorImg author={{ name: result.name }} />
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
    </section>
  );
}
