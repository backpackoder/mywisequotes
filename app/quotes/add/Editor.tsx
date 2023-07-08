"use client";

import { Dispatch, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

// Components
import { EditorWrapper } from "@/components/add/EditorWrapper";
import { EditorItemWrapper } from "@/components/add/EditorItemWrapper";
import { AddBtn } from "@/components/buttons/AddBtn";

// Types
import { Tag, TagTranslation } from "@prisma/client";
import { Action, State } from "./page";
import { PrismaLanguage } from "@/types/prisma";

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
      {/* <Tags translations={translations} state={state} dispatch={dispatch} /> */}
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
  console.log("contentIndexFinder", contentIndexFinder);

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
  return (
    <EditorItemWrapper>
      <label htmlFor="author">Select the author</label>

      <select
        name="author"
        id="author"
        defaultValue={author ?? "Unknown author"}
        className="p-2 border border-black rounded-xl"
        onChange={(e) => dispatch({ type: "SET_AUTHOR", payload: e.target.value })}
      >
        <option value="Unknown author">Select...</option>
        <option value="Albert Einstein">Albert Einstein</option>
        <option value="Isaac Newton">Isaac Newton</option>
        <option value="Galileo Galilei">Galileo Galilei</option>
        <option value="Marie Curie">Marie Curie</option>
        <option value="Stephen Hawking">Stephen Hawking</option>
        <option value="Error on purpose">Error on purpose</option>
      </select>

      <AddBtn text="Add author" addFunction={() => console.log("Add author")} />
    </EditorItemWrapper>
  );
}

export type TagsProps = {
  translations: PrismaLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};

function Tags({ translations, state, dispatch }: TagsProps) {
  const [tagList, setTagList] = useState<TagTranslation[]>([]);

  useEffect(() => {
    async function getTags() {
      const res = await fetch("/api/tags", {
        method: "GET",
      });
      const resTranslations = await fetch("/api/tags/translations", {
        method: "GET",
      });

      const tags: Tag[] = await res.json();
      const tagsTranslations: TagTranslation[] = await resTranslations.json();

      const tagsWithTranslations = tagsTranslations.filter((tagTranslation) => {
        const filterLanguages = translations?.filter(
          (translation) => translation.code === state.language
        );

        return filterLanguages?.some(
          (filterLanguage) => filterLanguage.id === tagTranslation.languageId
        );
      });

      setTagList(tagsWithTranslations);
    }

    getTags();
  }, [dispatch, state.language, translations]);

  return (
    <EditorItemWrapper>
      <p>Select the tags</p>

      <AvailableTags tagList={tagList} state={state} dispatch={dispatch} />

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
  );
}

type AvailableTagsProps = {
  tagList: TagTranslation[];
  state: State;
  dispatch: Dispatch<Action>;
};

function AvailableTags({ tagList, state, dispatch }: AvailableTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tagList?.map((tag, index) => {
        const tagAlreadySelected = state.tags.some((selectedTag) => selectedTag === tag.name);

        return (
          !tagAlreadySelected && (
            <button
              key={index}
              className="flex flex-wrap items-center justify-center gap-2 py-1 px-2 border rounded-md duration-150 hover:scale-110 hover:bg-blue-100"
              onClick={() => dispatch({ type: "SET_TAGS", payload: tag.name })}
            >
              {tag.name}
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
