import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";

// Components
import UserProfile from "@/components/userProfile/UserProfile";

type UserProfileProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: UserProfileProps): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function User({ params }: UserProfileProps) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const isProfileMine = session?.user?.email === user?.email;

  if (!user) {
    return <div className="text-center">User not found</div>;
  }

  return user && <UserProfile user={user} isProfileMine={isProfileMine} />;
}
