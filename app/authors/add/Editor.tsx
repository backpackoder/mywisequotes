"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, useEffect, useState } from "react";

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
    <EditorWrapper
      LanguageComponent={<Language translations={translations} state={state} dispatch={dispatch} />}
    >
      <FindAuthorOnWikipedia wikiData={state.wikiData} dispatch={dispatch} />
      <Name translations={translations} state={state} dispatch={dispatch} />
      <Description translations={translations} state={state} dispatch={dispatch} />
      <Bio translations={translations} state={state} dispatch={dispatch} />
    </EditorWrapper>
  );
}

function Language({ translations, state, dispatch }: EditorProps) {
  const { language, originalLanguage } = state;

  return (
    <div className="flex flex-col items-center h-full gap-2 shadow-md">
      <p>Select the language</p>

      <ul className="flex flex-wrap items-start justify-center gap-2">
        {translations.map((translation, index) => {
          return (
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
                  dispatch({
                    type: "SET_ORIGINAL_LANGUAGE",
                    payload: originalLanguage === translation.code ? null : translation.code,
                  })
                }
              >
                Original
              </button>
            </li>
          );
        })}

        <AddBtn
          text="Suggest a language"
          addFunction={() => console.log("Suggest a new language")}
        />
      </ul>
    </div>
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
  const [test, setTest] = useState<any>(null);
  console.log("test OHHH", test);

  async function searchAuthor() {
    authorNameValue && router.push(`${pathname}?author=${authorNameValue}`);

    authorNameValue &&
      (await getWikiData(authorNameValue).then((res) => {
        function isOk(response: boolean) {
          dispatch({
            type: "SET_WIKI_DATA",
            payload: response ? res : undefined,
          });
        }
        isOk(!!res);
      }));
  }

  useEffect(() => {
    async function getTest() {
      const res = await fetch("api/test", {
        method: "GET",
      });
      console.log("res", res);

      const user = await res.json();
      console.log("user", user);

      setTest(user);
    }

    getTest();
  }, []);

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

      <button
        type="button"
        className="p-2 border border-black rounded-xl"
        onClick={() => searchAuthor()}
      >
        Find the author
      </button>

      {wikiData ? <AuthorFound /> : <AuthorNotFound />}
    </div>
  );
}

function AuthorFound() {
  return (
    <p className="bg-green-500 text-white text-center font-semibold p-2 rounded-lg">
      Author found!
    </p>
  );
}

function AuthorNotFound() {
  const queryParams = useSearchParams().get("author");
  console.log("queryParams AuthorNotFound", queryParams);

  return queryParams !== null && queryParams !== "" ? (
    <p className="bg-red-500 text-white text-center font-semibold p-2 rounded-lg">
      No author found with the name of {`"${queryParams}"`}
    </p>
  ) : null;
}

function Name({ translations, state, dispatch }: EditorProps) {
  const { language, names } = state;

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

  return state.language !== "en" && (nameIndexFinder || nameIndexFinder === 0) ? (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s name in{" "}
          <span className="font-semibold">
            {translations[nameIndexFinder].englishName.toLowerCase()}
          </span>{" "}
          here
          <br />
          (if different from english):
        </label>

        <textarea
          name="content"
          cols={30}
          rows={1}
          placeholder="Albert Einstein"
          value={names?.[nameIndexFinder].name}
          maxLength={200}
          className="p-2 border border-black rounded-xl"
          onChange={(e) => handleName(e)}
        ></textarea>
      </div>
    </div>
  ) : null;
}

function Description({ translations, state, dispatch }: EditorProps) {
  const nameIndexFinder = translations?.findIndex(
    (translation) => translation.code === state.language
  );

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s description in{" "}
          <span className="font-semibold">
            {translations[nameIndexFinder].englishName.toLowerCase()}
          </span>{" "}
          here:
        </label>

        <textarea
          name="content"
          cols={30}
          rows={2}
          placeholder="Ancient Greek philosopher"
          value={state.description ?? ""}
          maxLength={100}
          className="p-2 border border-black rounded-xl"
          onChange={(e) =>
            dispatch({
              type: "SET_DESCRIPTION",
              payload: e.target.value,
            })
          }
        ></textarea>
      </div>
    </div>
  );
}

function Bio({ translations, state, dispatch }: EditorProps) {
  const nameIndexFinder = translations?.findIndex(
    (translation) => translation.code === state.language
  );

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s bio in{" "}
          <span className="font-semibold">
            {translations[nameIndexFinder].englishName.toLowerCase()}
          </span>{" "}
          here:
        </label>

        <textarea
          name="content"
          rows={10}
          placeholder="Albert Einstein was a German-born theoretical physicist who developed the theory of relativity,
          one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science.
          He is best known to the general public for his mass–energy equivalence formula E = mc2, which has been dubbed the
          world's most famous equation....."
          value={state.bio ?? ""}
          maxLength={5000}
          className="p-2 min-w-[50vw] max-w-full border border-black rounded-xl"
          onChange={(e) =>
            dispatch({
              type: "SET_BIO",
              payload: e.target.value,
            })
          }
        ></textarea>
      </div>
    </div>
  );
}
