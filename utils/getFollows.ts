import { prisma } from "@/lib/prisma";

export function getFollows(id: string) {
  const followers = prisma.follows.count({
    where: {
      followingId: id,
    },
  });

  const following = prisma.follows.count({
    where: {
      followerId: id,
    },
  });

  return { followers, following };
}
