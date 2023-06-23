"use client";

import { useMemo, useState } from "react";

// Types
import { User } from "@prisma/client";

type UserDataEditorProps = {
  type: keyof User;
  user: User;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleModifiedData: () => void;
};

export function UserDataEditor({
  type,
  user,
  setIsEditing,
  handleModifiedData,
}: UserDataEditorProps) {
  const [value, setValue] = useState(user[type]);

  function handleCancel() {
    setValue("");
    setIsEditing(false);
  }

  async function updateUser() {
    const body = {
      [type]: value,
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (value === "") return setIsEditing(false);

    value !== user[type]
      ? res
          .json()
          .then(() => handleModifiedData())
          .then(() => setIsEditing(false))
      : setIsEditing(false);
  }

  const editor = useMemo(() => {
    switch (type) {
      case "bio":
        return (
          <textarea
            name={type}
            defaultValue={user[type] ?? ""}
            value={value?.toString() ?? ""}
            className="min-h-[150px] p-2 border-2 rounded-lg"
            onChange={(e) => setValue(e.target.value)}
          />
        );

      default:
        return (
          <input
            type="text"
            name={type}
            defaultValue={user[type]?.toLocaleString() ?? ""}
            value={value?.toLocaleString() ?? ""}
            max={type === "name" ? 30 : undefined}
            className="p-2 border-2 rounded-lg"
            onChange={(e) => setValue(e.target.value)}
          />
        );
    }
  }, [type, user, value]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {editor}

      {!value && (
        <p className="bg-red-300 py-1 px-2 rounded-lg">You must enter at last 1 caracter!</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="bg-red-300 p-2 rounded-lg" onClick={() => handleCancel()}>
          Cancel
        </button>

        <button className="bg-green-300 p-2 rounded-lg" onClick={() => value && updateUser()}>
          Save
        </button>
      </div>
    </div>
  );
}
