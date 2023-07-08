import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request, params: { params: { query: string } }) {
  const author = await prisma.author.findMany({
    where: {
      translations: {
        some: {
          name: {
            contains: params.params.query,
            mode: "insensitive",
          },
        },
      },
    },

    include: PRISMA_CALLS.authors.include,
  });

  const count = author.length;

  const data = {
    count,
    data: author,
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
