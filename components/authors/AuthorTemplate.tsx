import { getServerSession } from "next-auth";
import Link from "next/link";

// Components
import { AuthorImg } from "../quotes/AuthorImg";
import { QuoteItem } from "../quotes/QuoteItem";

// Utils
import { authOptions } from "@/utils/authOptions";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { prisma } from "@/lib/prisma";
import { WikiAuthorDatas } from "@/app/authors/[slug]/page";
import { User } from "@prisma/client";
import { API } from "@/types/prisma";

type AuthorTemplateProps = {
  slugWithSpaces: string;
  wikiData: WikiAuthorDatas;
};

export async function AuthorTemplate({ slugWithSpaces, wikiData }: AuthorTemplateProps) {
  const session = await getServerSession(authOptions);

  const currentUserId = await prisma.user
    .findUnique({ where: { email: session?.user?.email ?? "" } })
    .then((user) => user?.id ?? "");

  const user: API<User> = await prisma.user.findUnique({
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
        code: user?.language === "" ? "en" : user?.language,
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

        <Link
          href={{
            pathname: ROUTES.AUTHOR_EDIT(slugWithSpaces),
            query: `author=${author?.englishName}&id=${author?.id}`,
          }}
          className="bg-blue-500 text-white p-2 rounded-lg duration-300 hover:bg-blue-700"
        >
          Edit
        </Link>

        {
          <>
            {/* @ts-expect-error Async Server Component */}
            <QuotesOfTheAuthor authorName={slugWithSpaces} user={user} />
          </>
        }
      </>
    )
  );
}

type QuotesOfTheAuthorProps = {
  authorName: string;
  user: API<User>;
};

async function QuotesOfTheAuthor({ authorName, user }: QuotesOfTheAuthorProps) {
  const author = await prisma.author.findFirst({
    where: {
      englishName: authorName,
    },
    include: {
      quotes: true,
      translations: true,
    },
  });
  console.log("authorauthorauthor", author);

  console.log("useruseruser", user);

  const authorTranslation = await prisma.authorTranslation.findFirst({
    where: {
      language: {
        code: user?.language ?? "en",
      },
    },
  });
  console.log("authorTranslationauthorTranslationauthorTranslation", authorTranslation);

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
