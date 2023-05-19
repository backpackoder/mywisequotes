// Types
import { Params } from "@/types/params";
import { Quote } from "@/types/API";

// Hooks
import { useGetData } from "@/hooks/getData";

// Commons
import { API_URL } from "@/commons/commons";
import Link from "next/link";

export default async function RandomQuote() {
  const params: Params = {
    url: API_URL.RANDOM_SINGLE,

    maxLength: 1000,
    minLength: 1,
    tags: "",
    author: "",
  };

  const data: Quote = await useGetData(params);

  return (
    data && (
      <section className="p-2 border-2">
        <p>
          {`"`}
          {data.content}
          {`"`}
        </p>
        <Link href={`/authors/${data._id}/${data.authorSlug}`}>- {data.author}</Link>
      </section>
    )
  );
}
