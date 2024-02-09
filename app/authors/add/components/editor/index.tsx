"use client";

import { useMemo } from "react";

// Components
import { EditorWrapper } from "@/components/add/EditorWrapper";
import { Preview } from "../Preview";
import { AuthorSubmitted } from "./AuthorSubmitted";
import { AuthorExists } from "./AuthorExists";
import { FindAuthorOnWikipedia } from "./FindAuthorOnWikipedia";
import { Bio } from "./Bio";
import { Description } from "./Description";
import { Name } from "./Name";
import { Language } from "./Language";
import { AuthorNotFound } from "./AuthorNotFound";
import { AuthorFound } from "./AuthorFound";
import { SubmitBtn } from "@/components/SubmitBtn";

// Types
import { EditorProps } from "../../types";

export function Editor({
  translations,
  state,
  dispatch,
  addAuthor,
}: EditorProps & { addAuthor: () => Promise<any> }) {
  const status = useMemo(() => {
    switch (state.status) {
      case "found":
        return (
          <>
            <Preview state={state} />
            <AuthorFound />
          </>
        );

      case "not found":
        return <AuthorNotFound />;

      case "exists":
        return (
          <>
            <Preview state={state} />
            <AuthorExists />
          </>
        );

      case "valid":
        return (
          <>
            <Preview state={state} />

            <EditorWrapper
              LanguageComponent={
                <Language translations={translations} state={state} dispatch={dispatch} />
              }
            >
              <Name translations={translations} state={state} dispatch={dispatch} />
              <Description translations={translations} state={state} dispatch={dispatch} />
              <Bio translations={translations} state={state} dispatch={dispatch} />
              <SubmitBtn handleData={addAuthor} />
            </EditorWrapper>
          </>
        );

      case "submitted":
        return <AuthorSubmitted state={state} dispatch={dispatch} />;

      default:
        return null;
    }
  }, [addAuthor, dispatch, state, translations]);

  return (
    <>
      {status}

      {state.status !== "valid" && state.status !== "submitted" && (
        <FindAuthorOnWikipedia state={state} dispatch={dispatch} />
      )}
    </>
  );
}
