"use client";

import Link from "next/link";

// Types
import { Params } from "@/types/params";
import { PrismaAuthor } from "@/types/prisma";

// Utils
import { languageIndexFinder } from "@/utils/languageIndexFinder";

// Commons
import { ROUTES } from "@/commons/commons";

// Components
import { AuthorImg } from "@/components/quotes/AuthorImg";

type AuthorCardProps = {
  author: PrismaAuthor;
  state: Params;
};

export function Ar() {
  return <p>e</p>;
}

export function AuthorCard({ author, state }: AuthorCardProps) {
  const englishName = author.englishName;

  const findLanguageIndex = languageIndexFinder({
    data: author.translations,
    values: ["language", "code"],
    search: state.language,
  });

  const name = findLanguageIndex === -1 ? englishName : author.translations[findLanguageIndex].name;
  const description =
    findLanguageIndex === -1 ? "" : author.translations[findLanguageIndex].description;

  return (
    <div className="group flex flex-col items-center bg-blue-200 p-4  rounded-lg duration-300 hover:bg-blue-300">
      <Link href={ROUTES.AUTHOR(englishName)} className="text-2xl">
        {name}
      </Link>

      <small>
        ({author.quotes.length} {author.quotes.length === 1 ? "quote" : "quotes"})
      </small>

      <div className="flex items-center justify-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
        <AuthorImg author={englishName} />
      </div>

      <h3>{description}</h3>

      <Link
        href={ROUTES.AUTHOR(englishName)}
        className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
      >
        VIEW INFOS
      </Link>
    </div>
  );
}
