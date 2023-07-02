"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { UserDataEditor } from "../UserDataEditor";

// Styles
import { styles } from "@/app/assets/styles/styles";

// Utils
import toCapitalize from "@/utils/toCapitalize";

// Commons
import { IMAGES } from "@/commons/commons";

// Types
import { User } from "@prisma/client";
import { SettingsItemProps } from "@/types/props";

export default function Settings() {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const data = {
    username: user?.username,
    name: user?.name ?? "Unknown",
    image: user?.image ?? IMAGES.DEFAULT_PROFILE_IMAGE,
    bio: user?.bio ?? "",
    nationality: user?.nationality ?? "Unknown",
  };

  function handleModifiedData() {
    setIsRefresh((prev) => !prev);
  }

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const user: User | null | undefined = await res.json();

      setUser(user);
      console.log("user: ", user);
    }

    getUser();
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
                      src={data.image}
                      alt={`${data.name}'s profile`}
                      width={300}
                      height={300}
                      className={`${styles.imgSquareCropped} rounded-full cursor-pointer`}
                    />
                  </div>
                }
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-2 max-w-500">
              <SettingsItem
                type="username"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p className="text-center">{data.username}</p>}
              />

              <SettingsItem
                type="name"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p className="text-center">{data.name}</p>}
              />

              <SettingsItem
                type="nationality"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p className="text-center">{data.nationality}</p>}
              />

              <SettingsItem
                type="bio"
                user={user}
                handleModifiedData={handleModifiedData}
                Component={<p>{data.bio}</p>}
              />
            </div>
          </article>
        </section>
      )}
    </AuthCheck>
  );
}

function ImageProfileItem({ type, user, handleModifiedData, Component }: SettingsItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col flex-wrap gap-2">
      <h3 className="font-semibold">{toCapitalize(type)}:</h3>
      <div className="flex flex-col gap-4 py-2 px-4 border-2 rounded-lg">
        <div
          className={`group relative rounded-full ${isEditing ? "" : "hover:brightness-75"}`}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {Component}

          <FaCamera
            size={50}
            color="white"
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isEditing ? "hidden" : ""
            } opacity-0 z-50 duration-150 group-hover:opacity-100`}
          />
        </div>

        {isEditing && (
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="font-semibold">Link:</p>
            <UserDataEditor
              type={type}
              user={user}
              setIsEditing={setIsEditing}
              handleModifiedData={handleModifiedData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsItem({ type, user, Component, handleModifiedData }: SettingsItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col flex-wrap items-start gap-2 max-w-xs">
      <h3 className="font-semibold">{toCapitalize(type)}:</h3>

      <div className="py-2 px-4 rounded-lg border-2">
        {isEditing ? (
          <UserDataEditor
            type={type}
            user={user}
            setIsEditing={setIsEditing}
            handleModifiedData={handleModifiedData}
          />
        ) : (
          Component
        )}
      </div>

      {!isEditing && <ModifyButton setIsEditing={setIsEditing} />}
    </div>
  );
}

function ModifyButton({
  setIsEditing,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      className="bg-green-300 p-2 rounded-lg duration-150 hover:bg-green-400"
      onClick={() => setIsEditing((prev) => !prev)}
    >
      Modify
    </button>
  );
}
