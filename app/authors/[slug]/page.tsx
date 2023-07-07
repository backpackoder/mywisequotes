// Components
import { AuthorImg } from "@/components/quotes/AuthorImg";
import { QuoteItem } from "@/components/quotes/QuoteItem";

// Utils
import { getData } from "@/utils/getData";

// Commons
import { API_URL } from "@/commons/commons";

// Types
import { Params } from "@/types/params";
import { Author, Authors, Quotes } from "@/types/API";

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const authorsParams: Params = {
    url: API_URL.AUTHORS,
    slug,
  };

  const quotesParams: Params = {
    author: slug,
  };

  const author: Authors = await getData(authorsParams);
  const quotes: Quotes = await getData(quotesParams);

  return author.results.length === 1 && quotes ? (
    <section className="flex flex-col items-center gap-4">
      <h2 className="text-5xl">{author.results[0].name}</h2>

      <AuthorImg author={author.results[0].name} />

      <h3 className="text-lg">{author.results[0].description}</h3>

      <p>
        {author.results[0].bio}{" "}
        <a
          href={author.results[0].link}
          target="_blank"
          className="text-blue-500 hover:text-blue-800"
        >
          <small>Read more on Wikipedia</small>
        </a>
      </p>

      <div className="flex flex-col gap-4">
        <h3 className=" text-xl">
          {author.results[0].quoteCount > 0
            ? `${author.results[0].quoteCount} ${
                author.results[0].quoteCount === 1 ? "quote" : "quotes"
              } from ${author.results[0].name}:`
            : `No quotes found from ${author.results[0].name}`}
        </h3>

        {/* {quotes.results.map((result, index) => {
          return <QuoteItem key={index} quote={result} />;
        })} */}
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
            <AuthorImg author={author.results[0].name} />

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
