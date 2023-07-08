// Components
import { WikiAuthorDatas } from "@/app/authors/[slug]/page";
import { AuthorImg } from "../quotes/AuthorImg";
import { QuoteItem } from "../quotes/QuoteItem";

// Types
import { PrismaAuthors } from "@/types/prisma";

type AuthorTemplateProps = {
  author?: PrismaAuthors;
  wikiData: WikiAuthorDatas;
};

export function AuthorTemplate({ author, wikiData }: AuthorTemplateProps) {
  return (
    <>
      <h2 className="text-5xl">{author?.translations?.[0]?.name ?? wikiData?.name}</h2>

      <AuthorImg author={author?.translations?.[0]?.name ?? wikiData?.name} />

      <h3 className="text-lg">{author?.translations?.[0]?.description ?? wikiData?.description}</h3>

      <p>
        {author?.translations?.[0]?.bio ?? wikiData?.bio}{" "}
        <a
          href={author?.wikipediaLink ?? wikiData?.wikipediaLink.desktop}
          target="_blank"
          className="text-blue-500 hover:text-blue-800"
        >
          <small>Read more on Wikipedia</small>
        </a>
      </p>

      {author && <QuotesOfTheAuthor author={author} />}
    </>
  );
}

type QuotesOfTheAuthorProps = {
  author: PrismaAuthors;
};

function QuotesOfTheAuthor({ author }: QuotesOfTheAuthorProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className=" text-xl">
        {author.quotes.length > 0
          ? `${author.quotes.length} ${author.quotes.length === 1 ? "quote" : "quotes"} from ${
              author.translations[0].name
            }:`
          : `No quotes found from ${author.translations[0].name}`}
      </h3>

      {author.quotes.map((quote, index) => {
        return (
          <>
            {/* @ts-expect-error Async Server Component */}
            <QuoteItem key={index} quote={quote} />
          </>
        );
      })}
    </div>
  );
}
