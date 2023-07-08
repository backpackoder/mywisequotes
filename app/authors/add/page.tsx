"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { Preview } from "./Preview";
import { Editor } from "./Editor";

// Utils
import { getWikiData } from "@/utils/getWikiData";

// Types
import { API, ManyData, PrismaLanguage, PrismaUser } from "@/types/prisma";
import { wikiSummary } from "@/types/wikiResponse";

const initialState = {
  language: "en",
  originalLanguage: null as string | null,
  wikiData: null as API<wikiSummary>,
  names: [] as NameTranslation[],
};

export type State = typeof initialState;
export type Action =
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_ORIGINAL_LANGUAGE"; payload: string }
  | { type: "SET_WIKI_DATA"; payload: API<wikiSummary> }
  | { type: "SET_NAMES"; payload: NameTranslation[] };
export type NameTranslation = {
  code: string;
  name: string;
};

export default function AddAuthor() {
  const queryParams = useSearchParams().get("author");

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

      case "SET_WIKI_DATA":
        return { ...state, wikiData: action.payload };

      case "SET_NAMES":
        return { ...state, names: action.payload };

      default:
        return state;
    }
  }

  async function addAuthor() {}

  const nameIndexFinder = state.names?.findIndex((name) => name.code === state.language);

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
        type: "SET_NAMES",
        payload: translations.data.map((translation) => {
          return { code: translation.code, name: "" };
        }),
      });
  }, [translations]);

  useEffect(() => {
    async function searchAuthor() {
      queryParams &&
        (await getWikiData(queryParams).then((res) => {
          function isOk(response: boolean) {
            dispatch({
              type: "SET_WIKI_DATA",
              payload: response ? res : undefined,
            });
          }
          isOk(!!res);
        }));
    }

    searchAuthor();
  }, [queryParams]);

  return (
    user &&
    translations &&
    state.names.length > 0 &&
    (nameIndexFinder || nameIndexFinder === 0) && (
      <AuthCheck>
        <section className="flex flex-col gap-4">
          <Preview state={state} />
          <Editor translations={translations.data} state={state} dispatch={dispatch} />
          {/* <SubmitBtn addQuote={addQuote} /> */}
        </section>
      </AuthCheck>
    )
  );
}
