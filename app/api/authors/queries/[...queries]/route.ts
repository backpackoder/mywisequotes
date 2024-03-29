import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Commons
import { FILTERS } from "@/commons/commons";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request, { params }: { params: { queries: string[] } }) {
  function defaultChecker(value: string) {
    return value === FILTERS.DEFAULT ? "" : value;
  }

  const page = defaultChecker(params.queries[0]);
  const limit = defaultChecker(params.queries[1]);
  const sortBy = defaultChecker(params.queries[2]);
  const order = defaultChecker(params.queries[3]);
  const language = defaultChecker(params.queries[4]);

  const where = language
    ? {
        translations: {
          some: {
            language: {
              code: language,
            },
          },
        },
      }
    : undefined;

  const authors = await prisma.author.findMany({
    where,

    include: PRISMA_CALLS.authors.include,

    orderBy: {
      // [sortBy]: sortBy === "quotes" ? { quotes: { _count: "asc" } } : order,
      [sortBy]: order,
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),
  });

  const count = authors.length;

  const data = {
    count,
    data: authors,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const author = await prisma.author.create({
    data,
  });

  return NextResponse.json(author);
}
