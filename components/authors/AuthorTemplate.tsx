import { getServerSession } from "next-auth";

// Components
import { AuthorImg } from "../quotes/AuthorImg";
import { QuoteItem } from "../quotes/QuoteItem";

// Utils
import { authOptions } from "@/utils/authOptions";

// Types
import { prisma } from "@/lib/prisma";
import { WikiAuthorDatas } from "@/app/authors/[slug]/page";

type AuthorTemplateProps = {
  slugWithSpaces: string;
  wikiData: WikiAuthorDatas;
};

export async function AuthorTemplate({ slugWithSpaces, wikiData }: AuthorTemplateProps) {
  const session = await getServerSession(authOptions);

  const currentUserId = await prisma.user
    .findUnique({ where: { email: session?.user?.email ?? "" } })
    .then((user) => user?.id ?? "");

  const user = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });

  const author = await prisma.author.findFirst({
    where: {
      englishName: slugWithSpaces,
    },
    include: {
      quotes: true,
      translations: true,
    },
  });

  const authorTranslation = await prisma.authorTranslation.findFirst({
    where: {
      author: {
        englishName: slugWithSpaces,
      },
      language: {
        code: user?.language ?? "en",
      },
    },
  });

  return (
    authorTranslation && (
      <>
        <h2 className="text-5xl">{authorTranslation?.name}</h2>

        <AuthorImg author={slugWithSpaces} />

        <h3 className="text-lg">{authorTranslation?.description}</h3>

        <p>
          {authorTranslation.bio}{" "}
          <a
            href={author?.wikipediaLink ?? wikiData?.wikipediaLink.desktop}
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
          >
            <small>Read more on Wikipedia</small>
          </a>
        </p>

        {
          <>
            {/* @ts-expect-error Async Server Component */}
            <QuotesOfTheAuthor authorName={slugWithSpaces} />
          </>
        }
      </>
    )
  );
}

type QuotesOfTheAuthorProps = {
  authorName: string;
};

async function QuotesOfTheAuthor({ authorName }: QuotesOfTheAuthorProps) {
  const author = await prisma.author.findFirst({
    where: {
      englishName: authorName,
    },
    include: {
      quotes: true,
      translations: true,
    },
  });

  return (
    author && (
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
              <QuoteItem key={index} quote={quote} />
            </>
          );
        })}
      </div>
    )
  );
}
