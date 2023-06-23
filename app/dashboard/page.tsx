import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// Utils
import { authOptions } from "@/utils/authOptions";

// Types
import UserProfile from "@/components/userProfile/UserProfile";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({ where: { email: session?.user?.email! } });
  const isProfileMine = session?.user?.email === user?.email;

  return user && <UserProfile user={user} isProfileMine={isProfileMine} />;
}
