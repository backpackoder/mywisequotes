"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { EmailUpdatesItem, ImageProfileItem, LanguageItem, UserItem } from "./Items";

// Styles
import { styles } from "@/app/assets/styles/styles";

// Commons
import { IMAGES } from "@/commons/commons";

// Types
import { User } from "@prisma/client";

export default function Settings() {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const data = {
    user: {
      username: user?.username,
      name: user?.name ?? "Unknown",
      image: user?.image ?? IMAGES.DEFAULT_PROFILE_IMAGE,
      bio: user?.bio ?? "",
      nationality: user?.nationality ?? "Unknown",
    },
    settings: {
      emailUpdates: user?.emailUpdates ?? false,
      language: user?.language ?? "en",
    },
  };

  function handleModifiedData() {
    setIsRefresh((prev) => !prev);
  }

  useEffect(() => {
    async function getSettings() {
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const user: User | null | undefined = await res.json();

      setUser(user);
    }

    getSettings();
  }, [isRefresh]);

  return (
    <AuthCheck>
      {user && (
        <section className="flex flex-col items-center justify-center gap-8">
          <h2 className="font-semibold text-4xl">⚙️ Settings</h2>

          <article className="flex flex-wrap items-center justify-center gap-8">
            <div className="max-w-500 duration-150">
              <ImageProfileItem
                type="image"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={
                  <div className="rounded-full">
                    <Image
                      src={data.user.image}
                      alt={`${data.user.name}'s profile`}
                      width={300}
                      height={300}
                      className={`${styles.imgSquareCropped} rounded-full cursor-pointer`}
                    />
                  </div>
                }
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-2 max-w-500">
              <UserItem
                type="username"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p className="text-center">{data.user.username}</p>}
              />

              <UserItem
                type="name"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p className="text-center">{data.user.name}</p>}
              />

              <UserItem
                type="nationality"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p className="text-center">{data.user.nationality}</p>}
              />

              <UserItem
                type="bio"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p>{data.user.bio}</p>}
              />

              <LanguageItem
                typeSettings="language"
                user={user}
                handleModifiedData={handleModifiedData}
              />

              <EmailUpdatesItem
                typeSettings="emailUpdates"
                user={user}
                handleModifiedData={handleModifiedData}
              />
            </div>
          </article>
        </section>
      )}
    </AuthCheck>
  );
}
