"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  currentUserId: string;
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ currentUserId, targetUserId, isFollowing }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const follow = async () => {
    setIsFetching(true);

    await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();
    });
  };

  const unfollow = async () => {
    setIsFetching(true);

    await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });

    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  if (isFollowing) {
    return (
      <Btn
        currentUserId={currentUserId}
        targetUserId={targetUserId}
        labels={{ label: "Unfollow", mutating: "Unfollowing..." }}
        isMutating={isMutating}
        action={unfollow}
      />
    );
  } else {
    return (
      <Btn
        currentUserId={currentUserId}
        targetUserId={targetUserId}
        labels={{ label: "Follow", mutating: "Following..." }}
        isMutating={isMutating}
        action={follow}
      />
    );
  }
}

export type BtnProps = {
  currentUserId: string;
  targetUserId: string;
  labels: { label: "Follow" | "Unfollow"; mutating: "Following..." | "Unfollowing..." };
  isMutating: boolean;
  action: () => void;
};

function Btn({ currentUserId, targetUserId, labels, isMutating, action }: BtnProps) {
  const { data: session } = useSession();

  const [autoFollow, setAutoFollow] = useState(!!session);
  const [unauth, setUnauth] = useState(false);
  const { label, mutating } = labels;

  function handleClick() {
    if (!session) {
      setUnauth(true);
      return;
    }

    if (currentUserId === targetUserId) {
      setAutoFollow(true);
      return;
    }

    action();
  }

  return (
    <>
      <button
        className={`bg-blue-200 text-black py-2 px-4 rounded-xl duration-300 ${
          !isMutating && (label === "Follow" ? "hover:bg-green-500" : "hover:bg-red-500")
        } hover:text-white shadow-xl`}
        onClick={() => handleClick()}
      >
        {isMutating ? mutating : label}
      </button>

      <div className={`${autoFollow ? "block" : "hidden"} text-red-500`}>
        {`You can't ${label.toLowerCase()} yourself!`}
      </div>

      <div className={`${unauth ? "block" : "hidden"} text-red-500`}>
        {`You must be logged in to ${label.toLowerCase()} someone!`}
      </div>
    </>
  );
}
