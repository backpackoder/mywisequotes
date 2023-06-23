"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>Something went wrong!</h2>

      <button className="bg-gray-200 p-2 border-2" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
