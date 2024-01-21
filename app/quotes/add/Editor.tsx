"use client";

import { Dispatch, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

// Components
import { EditorWrapper } from "@/components/add/EditorWrapper";
import { EditorItemWrapper } from "@/components/add/EditorItemWrapper";
import { AddBtn } from "@/components/buttons/AddBtn";

// Types
import { Action, State } from "./page";
import { API, ManyData, PrismaAuthor, PrismaLanguage, PrismaTag } from "@/types/prisma";

export type EditorProps = {
  translations: PrismaLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};

export function Editor({ translations, state, dispatch }: EditorProps) {
  return translations ? (
    <EditorWrapper>
      <LanguageAndContent translations={translations} state={state} dispatch={dispatch} />
      <Author author={state.author} dispatch={dispatch} />
      <Tags translations={translations} state={state} dispatch={dispatch} />
    </EditorWrapper>
  ) : null;
}

type LanguageAndContentProps = {
  translations: PrismaLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};

function LanguageAndContent({ translations, state, dispatch }: LanguageAndContentProps) {
  const { language, originalLanguage, contents } = state;

  const contentIndexFinder = translations?.findIndex(
    (translation) => translation.code === language
  );

  function handleContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (state.contents && contentIndexFinder !== undefined && contentIndexFinder > -1) {
      const updatedContents = [...state.contents];
      updatedContents[contentIndexFinder] = {
        ...updatedContents[contentIndexFinder],
        content: e.target.value,
      };

      dispatch({
        type: "SET_CONTENTS",
        payload: updatedContents,
      });
    }
  }

  return contentIndexFinder || contentIndexFinder === 0 ? (
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
          Write your quote in{" "}
          <span className="font-semibold">{translations[0].englishName.toLowerCase()}</span> here:
        </label>

        <textarea
          name="content"
          cols={30}
          rows={5}
          placeholder="Time is an illusion. Lunchtime doubly so..."
          value={contents?.[contentIndexFinder].content}
          className="p-2 border border-black rounded-xl"
          onChange={(e) => handleContent(e)}
        ></textarea>
      </div>
    </div>
  ) : null;
}

type AuthorProps = {
  author: string | null;
  dispatch: Dispatch<Action>;
};

function Author({ author, dispatch }: AuthorProps) {
  const [authors, setAuthors] = useState<API<ManyData<PrismaAuthor>>>(null);

  useEffect(() => {
    async function fetchAuthors() {
      const res = await fetch("/api/authors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data) => setAuthors(data));
    }

    fetchAuthors();
  }, []);

  return authors ? (
    <EditorItemWrapper>
      <label htmlFor="author">Select the author</label>

      <select
        name="author"
        id="author"
        defaultValue={author ?? ""}
        className="p-2 border border-black rounded-xl"
        onChange={(e) => dispatch({ type: "SET_AUTHOR", payload: e.target.value })}
      >
        <option value="">Unknown author</option>
        {authors.data.map((author) => (
          <option key={author.id} value={author.englishName}>
            {author.translations[0].name}
          </option>
        ))}
      </select>

      <AddBtn text="Add author" addFunction={() => console.log("Add author")} />
    </EditorItemWrapper>
  ) : null;
}

export type TagsProps = {
  translations: PrismaLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};

function Tags({ translations, state, dispatch }: TagsProps) {
  const [tags, setTags] = useState<API<ManyData<PrismaTag>>>(null);
  console.log("tags editor", tags);
  console.log("first");

  useEffect(() => {
    async function getTags() {
      const res = await fetch("/api/tags", {
        method: "GET",
      });

      await res.json().then((res) => setTags(res));
    }

    getTags();
  }, [dispatch, state.language, translations]);

  return tags ? (
    <EditorItemWrapper>
      <p>Select the tags</p>

      <AvailableTags tags={tags} state={state} dispatch={dispatch} />

      <SelectedTags state={state} dispatch={dispatch} />

      {/* <option value="life">Life</option>
        <option value="science">Science</option>
        <option value="philosophy">Philosophy</option>
        <option value="religion">Religion</option>
        <option value="politics">Politics</option>
        <option value="humor">Humor</option>
        <option value="money">Money</option> */}

      <p>{`You don't find the right one?`}</p>

      <AddBtn text="Suggest a tag" addFunction={() => console.log("Add tag")} />
    </EditorItemWrapper>
  ) : null;
}

type AvailableTagsProps = {
  tags: ManyData<PrismaTag>;
  state: State;
  dispatch: Dispatch<Action>;
};

function AvailableTags({ tags, state, dispatch }: AvailableTagsProps) {
  console.log("tags AvailableTags", tags);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.data.map((tag, index) => {
        const tagAlreadySelected = state.tags.some(
          (selectedTag) => selectedTag === tag.translations[0].name
        );
        console.log("tagAlreadySelected", tagAlreadySelected);

        return (
          !tagAlreadySelected && (
            <button
              key={index}
              className="flex flex-wrap items-center justify-center gap-2 py-1 px-2 border rounded-md duration-150 hover:scale-110 hover:bg-blue-100"
              onClick={() => dispatch({ type: "SET_TAGS", payload: tag.translations[0].name })}
            >
              {tag?.translations?.[0]?.name ?? "No name"}
            </button>
          )
        );
      })}
    </div>
  );
}

type SelectedTagsProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

function SelectedTags({ state, dispatch }: SelectedTagsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {state.tags.map((tag, index) => {
        return (
          <div
            key={index}
            className="flex flex-wrap items-center justify-center gap-2 bg-blue-100 py-1 px-2 border rounded-md"
          >
            <p key={index}>{tag}</p>

            <FaTrash
              size={16}
              color="red"
              className="cursor-pointer duration-150 hover:scale-110"
              onClick={() => dispatch({ type: "DELETE_TAG", payload: tag })}
            />
          </div>
        );
      })}
    </div>
  );
}
