import Image from "next/image";

// Components
import FollowButton from "../followBtn/FollowBtn";
import { DiscoverQuotesAndAuthors } from "../DiscoverQuotesAndAuthors";
import { CreateQuote } from "../quotes/CreateQuote";
import { AddAuthor } from "../authors/AddAuthor";

// Assets
import moderator from "@/app/assets/images/roles/moderator.png";
import admin from "@/app/assets/images/roles/admin.png";
import owner from "@/app/assets/images/roles/owner.png";
import { styles } from "@/app/assets/styles/styles";

// Commons
import { IMAGES } from "@/commons/commons";

// Types
import { User } from "@prisma/client";
import { UserProfilePartsProps } from "@/types/props";
import Follows from "../Follows/Follows";

export type UserProfileProps = {
  user: User;
  isProfileMine: boolean;
};

export default function UserProfile({ user, isProfileMine }: UserProfileProps) {
  const data = {
    username: user?.username,
    name: user?.name ?? "Unknown",
    image: user?.image ?? IMAGES.DEFAULT_PROFILE_IMAGE,
    bio: user?.bio ?? "",
    nationality: user?.nationality ?? "Unknown",
    role: getRole(),
  };

  function getRole() {
    switch (user?.role) {
      case "OWNER":
        return (
          <>
            <Image src={owner} alt="Owner's badge" width={50} height={50} /> Owner
          </>
        );

      case "ADMIN":
        return (
          <>
            <Image src={admin} alt="Admin's badge" width={50} height={50} /> Admin
          </>
        );

      case "MODERATOR":
        return (
          <>
            <Image src={moderator} alt="Moderator's badge" width={50} height={50} /> Moderator
          </>
        );

      default:
        return null;
    }
  }

  return (
    <section className="flex flex-col items-center min-w-full p-0">
      <article className="flex flex-col flex-wrap items-center justify-center gap-8 w-full p-4 sm:flex-row">
        <div className="flex flex-col items-center justify-center gap-4">
          <UserProfileName data={data} />

          <UserProfileImage data={data} />

          <UserProfileUsername data={data} />

          {/* @ts-expect-error Server Component */}
          {!isProfileMine && <FollowButton targetUserId={user.id} />}

          <Follows id={user.id} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {data.role && <UserProfileRole data={data} />}
          {user.bio && <UserProfileBio data={data} />}
          {user.nationality && <UserProfileNationality data={data} />}
        </div>
      </article>

      <article className="flex flex-wrap items-center justify-evenly gap-8 w-full bg-[#f7f7f7] p-8">
        <DiscoverQuotesAndAuthors
          text={{
            catchphrase: { before: "My favorite", after: "" },
            link: { before: "Discover my favorite", after: "" },
          }}
        />
      </article>

      {isProfileMine && (
        <article className="flex flex-wrap items-center justify-evenly gap-8 w-full p-4">
          <CreateQuote />
          <AddAuthor />
        </article>
      )}
    </section>
  );
}

function UserProfileName({ data }: UserProfilePartsProps) {
  return <h1 className="font-bold text-4xl">{data.name}</h1>;
}

function UserProfileImage({ data }: UserProfilePartsProps) {
  return (
    <Image
      src={data.image.toString()}
      alt={`${data}'s profile`}
      width={200}
      height={200}
      className={`${styles.imgSquareCropped} rounded-full`}
    />
  );
}

function UserProfileUsername({ data }: UserProfilePartsProps) {
  return <h2 className="text-lg">@{data.username}</h2>;
}

function UserProfileRole({ data }: UserProfilePartsProps) {
  return (
    <div>
      <h3 className="font-semibold">Role:</h3>
      <div className="flex flex-col items-center justify-center h-full bg-gray-200 py-4 px-8 border-2 rounded-xl">
        {data.role}
      </div>
    </div>
  );
}

function UserProfileBio({ data }: UserProfilePartsProps) {
  return (
    <div>
      <h3 className="font-semibold">Bio:</h3>
      <div className="h-full bg-gray-200 py-4 px-8 border-2 rounded-xl">
        <p>{`-"${data.bio}"`}</p>
      </div>
    </div>
  );
}

function UserProfileNationality({ data }: UserProfilePartsProps) {
  return (
    <div>
      <h3 className="font-semibold">Origin:</h3>
      <div className="h-full bg-gray-200 py-4 px-8 border-2 rounded-xl">
        <p>{data.nationality}</p>
      </div>
    </div>
  );
}
