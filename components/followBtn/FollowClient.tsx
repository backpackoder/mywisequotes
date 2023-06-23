"use client";

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
        labels={{ status: "Unfollow", mutating: "Unfollowing..." }}
        isMutating={isMutating}
        action={unfollow}
      />
    );
  } else {
    return (
      <Btn
        currentUserId={currentUserId}
        targetUserId={targetUserId}
        labels={{ status: "Follow", mutating: "Following..." }}
        isMutating={isMutating}
        action={follow}
      />
    );
  }
}

export type BtnProps = {
  currentUserId: string;
  targetUserId: string;
  labels: { status: "Follow" | "Unfollow"; mutating: "Following..." | "Unfollowing..." };
  isMutating: boolean;
  action: () => void;
};

function Btn({ currentUserId, targetUserId, labels, isMutating, action }: BtnProps) {
  const [autoFollow, setAutoFollow] = useState(false);
  const { status, mutating } = labels;

  return (
    <>
      <button
        className={`bg-blue-200 text-black py-2 px-4 rounded-xl duration-300 ${
          !isMutating && (status === "Follow" ? "hover:bg-green-500" : "hover:bg-red-500")
        } hover:text-white shadow-xl`}
        onClick={() => (currentUserId === targetUserId ? setAutoFollow(true) : action())}
      >
        {isMutating ? mutating : status}
      </button>

      <div className={`${autoFollow ? "block" : "hidden"} text-red-500`}>
        {`You can't ${status.toLowerCase()} yourself!`}
      </div>
    </>
  );
}
