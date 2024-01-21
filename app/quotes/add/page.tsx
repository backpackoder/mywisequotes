"use client";

import { useEffect, useReducer, useState } from "react";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { Preview } from "./Preview";
import { Editor } from "./Editor";
import { SubmitBtn } from "./SubmitBtn";

// Types
import { API, ManyData, PrismaLanguage, PrismaUser } from "@/types/prisma";

const initialState = {
  language: "en",
  originalLanguage: null as string | null,
  contents: [] as ContentTranslation[],
  author: null as string | null,
  tags: [] as string[],
};

export type State = typeof initialState;
export type Action =
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_ORIGINAL_LANGUAGE"; payload: string }
  | { type: "SET_CONTENTS"; payload: ContentTranslation[] }
  | { type: "SET_AUTHOR"; payload: string }
  | { type: "SET_TAGS"; payload: string }
  | { type: "DELETE_TAG"; payload: string };
export type ContentTranslation = {
  code: string;
  content: string;
};

export default function AddQuote() {
  const [user, setUser] = useState<API<PrismaUser>>(null);
  const [translations, setTranslations] = useState<API<ManyData<PrismaLanguage>>>(null);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  console.log("state", state);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_LANGUAGE":
        return { ...state, language: action.payload };
      case "SET_ORIGINAL_LANGUAGE":
        return { ...state, originalLanguage: action.payload };
      case "SET_CONTENTS":
        return { ...state, contents: action.payload };
      case "SET_AUTHOR":
        return { ...state, author: action.payload };
      case "SET_TAGS":
        return { ...state, tags: [...state.tags, action.payload] };
      case "DELETE_TAG":
        return { ...state, tags: state.tags.filter((tag) => tag !== action.payload) };
      default:
        return state;
    }
  }

  async function addQuote() {}

  const contentIndexFinder = state.contents?.findIndex(
    (content) => content.code === state.language
  );

  useEffect(() => {
    async function fetchDatas() {
      const resUser = await fetch("/api/user", {
        method: "GET",
      });
      const resTranslations = await fetch("/api/languages", {
        method: "GET",
      });

      await resUser.json().then((data) => setUser(data));
      await resTranslations.json().then((data) => setTranslations(data));
    }

    fetchDatas();
  }, []);

  useEffect(() => {
    translations &&
      dispatch({
        type: "SET_CONTENTS",
        payload: translations.data.map((translation) => {
          return { code: translation.code, content: "" };
        }),
      });
  }, [translations]);

  return (
    user &&
    translations &&
    state.contents.length > 0 &&
    (contentIndexFinder || contentIndexFinder === 0) && (
      <AuthCheck>
        <section className="flex flex-col gap-4">
          <Preview
            content={state.contents[contentIndexFinder]?.content ?? ""}
            author={state.author ?? undefined}
            username={user.username}
          />
          <Editor translations={translations.data} state={state} dispatch={dispatch} />
          {/* <SubmitBtn addQuote={addQuote} /> */}
        </section>
      </AuthCheck>
    )
  );
}
