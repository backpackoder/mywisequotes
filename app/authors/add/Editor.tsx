"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, useState } from "react";

// Components
import { EditorWrapper } from "@/components/add/EditorWrapper";
import { AddBtn } from "@/components/buttons/AddBtn";

// Utils
import { getWikiData } from "@/utils/getWikiData";

// Types
import { Action, State } from "./page";
import { PrismaLanguage } from "@/types/prisma";

type EditorProps = {
  translations: PrismaLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};

export function Editor({ translations, state, dispatch }: EditorProps) {
  return (
    <EditorWrapper>
      <FindAuthorOnWikipedia wikiData={state.wikiData} dispatch={dispatch} />
      <LanguageAndName translations={translations} state={state} dispatch={dispatch} />
    </EditorWrapper>
  );
}

type FindAuthorOnWikipediaProps = {
  wikiData: State["wikiData"];
  dispatch: Dispatch<Action>;
};

function FindAuthorOnWikipedia({ wikiData, dispatch }: FindAuthorOnWikipediaProps) {
  const pathname = usePathname();
  const queryParams = useSearchParams().get("author");
  const router = useRouter();
  const [authorNameValue, setAuthorNameValue] = useState(queryParams ?? "");

  async function searchAuthor() {
    router.push(`${pathname}?author=${authorNameValue}`);

    await getWikiData(authorNameValue).then((res) => {
      function isOk(response: boolean) {
        dispatch({
          type: "SET_WIKI_DATA",
          payload: response ? res : undefined,
        });
      }
      isOk(!!res);
    });
  }

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <h3>Find the author on Wikipedia</h3>

        <input
          type="text"
          className="p-2 border border-black rounded-xl"
          placeholder="Search for the author on Wikipedia"
          value={authorNameValue}
          onChange={(e) => setAuthorNameValue(e.target.value)}
        />
      </div>

      {wikiData === undefined && <AuthorNotFound authorNameValue={authorNameValue} />}

      <button
        type="button"
        className="p-2 border border-black rounded-xl"
        onClick={() => searchAuthor()}
      >
        Find the author
      </button>
    </div>
  );
}

function AuthorNotFound({ authorNameValue }: { authorNameValue: string }) {
  return (
    <p className="bg-red-500 text-white text-center font-semibold p-2 rounded-lg">
      No author found with the name of {`"${authorNameValue}"`}
    </p>
  );
}

function LanguageAndName({ translations, state, dispatch }: EditorProps) {
  const { language, originalLanguage, names } = state;

  const nameIndexFinder = translations?.findIndex((translation) => translation.code === language);

  function handleName(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (state.names && nameIndexFinder !== undefined && nameIndexFinder > -1) {
      const updatedNames = [...state.names];
      updatedNames[nameIndexFinder] = {
        ...updatedNames[nameIndexFinder],
        name: e.target.value,
      };

      dispatch({
        type: "SET_NAMES",
        payload: updatedNames,
      });
    }
  }

  return nameIndexFinder || nameIndexFinder === 0 ? (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <p>Select the language</p>

        <ul className="flex flex-wrap justify-center gap-2 max-w-[300px]">
          {translations.map((translation, index) => (
            <li key={index} className="flex flex-col items-center gap-1">
              <button
                type="button"
                className={`${
                  language === translation.code ? "bg-green-300" : ""
                } p-2 border border-black rounded-xl`}
                onClick={() => dispatch({ type: "SET_LANGUAGE", payload: translation.code })}
              >
                {translation.englishName}
              </button>

              <button
                className={`${
                  originalLanguage === translation.code ? "bg-yellow-300" : ""
                } text-xs italic py-1 px-2 rounded-md`}
                onClick={() =>
                  dispatch({ type: "SET_ORIGINAL_LANGUAGE", payload: translation.code })
                }
              >
                Original
              </button>
            </li>
          ))}
        </ul>

        <AddBtn
          text="Suggest a language"
          addFunction={() => console.log("Suggest a new language")}
        />
      </div>

      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s name in{" "}
          <span className="font-semibold">{translations[0].englishName.toLowerCase()}</span> here
          <br />
          (if different from english):
        </label>

        <textarea
          name="content"
          cols={30}
          rows={1}
          placeholder="Albert Einstein"
          value={names?.[nameIndexFinder].name}
          className="p-2 border border-black rounded-xl"
          onChange={(e) => handleName(e)}
        ></textarea>
      </div>
    </div>
  ) : null;
}
