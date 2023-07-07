import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Commons
import { FILTERS } from "@/commons/commons";

export async function GET(req: Request, { params }: { params: { queries: string[] } }) {
  console.log("params", params);

  function defaultChecker(value: string) {
    return value === FILTERS.DEFAULT ? "" : value;
  }

  const page = defaultChecker(params.queries[0]);
  const limit = defaultChecker(params.queries[1]);
  const sortBy = defaultChecker(params.queries[2]);
  const order = defaultChecker(params.queries[3]);
  const language = defaultChecker(params.queries[4]);
  const author = defaultChecker(params.queries[5]);
  const tag = defaultChecker(params.queries[6]);

  const where = {
    translations: {
      some: {
        language: {
          code: {
            startsWith: language,
            endsWith: language,
          },
        },
      },
    },

    tags:
      tag.length > 0
        ? {
            some: {
              translations: {
                some: {
                  name: {
                    startsWith: tag,
                    endsWith: tag,
                  },
                },
              },
            },
          }
        : undefined,

    author: {
      translations: {
        some: {
          name: {
            startsWith: author,
            endsWith: author,
          },
        },
      },
    },
  };

  const quote = await prisma.quote.findMany({
    where,

    include: {
      createdBy: true,
      translations: {
        where: {
          language: {
            code: {
              startsWith: language,
              endsWith: language,
            },
          },
        },
        include: {
          language: true,
        },
      },
      tags: {
        include: {
          translations: {
            where: {
              name: {
                startsWith: tag,
                endsWith: tag,
              },
            },
            include: {
              language: true,
            },
          },
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

    take: Number(limit),
  });

  const count = quote.length;

  const data = {
    count,
    data: quote,
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
