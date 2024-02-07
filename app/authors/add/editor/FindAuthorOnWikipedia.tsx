"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, useEffect, useState } from "react";

// Utils
import { getWikiData } from "@/utils/getWikiData";

// Types
import { Action, State } from "../types";
import { Author } from "@prisma/client";

type FindAuthorOnWikipediaProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export function FindAuthorOnWikipedia({ state, dispatch }: FindAuthorOnWikipediaProps) {
  const pathname = usePathname();
  const queryParams = useSearchParams().get("author");
  const router = useRouter();
  const [authorNameValue, setAuthorNameValue] = useState(queryParams ?? "");
  console.log("queryParams", queryParams);

  function searchAuthor() {
    authorNameValue && router.push(`${pathname}?author=${authorNameValue}`);

    authorNameValue &&
      getWikiData(authorNameValue).then((res) => {
        dispatch({
          type: "SET_WIKI_DATA",
          payload: res ? res : undefined,
        });
      });
  }

  useEffect(() => {
    async function fetchAuthors() {
      const res = await fetch(`api/authors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data: Author[]) => {
        const authors = data.map((author: { englishName: string }) => author.englishName);
        const doesAuthorExists = authors.some((author) => author === state.wikiData?.title);
        dispatch({
          type: "SET_STATUS",
          payload: state.wikiData ? (doesAuthorExists ? "exists" : "found") : "not found",
        });
      });
    }

    fetchAuthors();
  }, [dispatch, state.status, state.wikiData, state.wikiData?.title]);

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <h3>Find the author on Wikipedia</h3>

        <input
          type="text"
          className="p-2 border border-black rounded-xl"
          placeholder="Search for the author on Wikipedia"
          value={authorNameValue}
          maxLength={200}
          onChange={(e) => setAuthorNameValue(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          className="p-2 border border-black rounded-xl"
          onClick={() => searchAuthor()}
        >
          Find the author
        </button>

        {state.status === "found" && (
          <button
            type="button"
            className="p-2 border border-black rounded-xl"
            onClick={() =>
              dispatch({
                type: "SET_STATUS",
                payload: "valid",
              })
            }
          >
            Validate
          </button>
        )}
      </div>

      <p>
        To avoid duplicates, you have to search for the author on Wikipedia.
        <br />
        If the author already exists, you can{"'"}t add it again, but you can modify the existing.
      </p>
    </div>
  );
}
