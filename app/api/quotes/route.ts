import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const quote = await prisma.quote.findMany({
    include: {
      createdBy: true,
      translations: true,
      tags: {
        include: {
          translations: true,
        },
      },
      author: {
        include: {
          translations: true,
        },
      },
      comments: {
        include: {
          user: true,
          likes: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true,
                  likes: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
          replies: {
            include: {
              user: true,
              likes: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const count = quote.length;

  const data = {
    data: quote,
    count,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const quote = await prisma.quote.create({
    data,
  });

  return NextResponse.json(quote);
}
