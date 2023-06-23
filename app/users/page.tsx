import { prisma } from "@/lib/prisma";

// Components
import UserCard from "@/components/UserCard";

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {users.map((user) => {
        return (
          <>
            {/* @ts-expect-error Server Component */}
            <UserCard key={user.id} {...user} />
          </>
        );
      })}
    </div>
  );
}
