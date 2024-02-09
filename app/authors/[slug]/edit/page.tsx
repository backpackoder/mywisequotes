"use client";

import {
  API,
  ManyData,
  PrismaAuthor,
  PrismaAuthorTranslation,
  PrismaLanguage,
  PrismaUser,
} from "@/types/prisma";
import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { wikiSummary } from "@/types/wikiResponse";
import { getWikiData } from "@/utils/getWikiData";
import { AuthCheck } from "@/components/AuthCheck";
import { Action, State, UpdateAuthorClientSide } from "../../add/types";
import { initialState } from "../../add/utils/initialState";
import { Preview } from "../../add/components/Preview";
import { EditorWrapper } from "@/components/add/EditorWrapper";
import { Language } from "../../add/components/editor/Language";
import { Name } from "../../add/components/editor/Name";
import { Description } from "../../add/components/editor/Description";
import { Bio } from "../../add/components/editor/Bio";
import { SubmitBtn } from "@/components/SubmitBtn";
import { AuthorSubmitted } from "../../add/components/editor/AuthorSubmitted";

export default function Edit() {
  const queryParamsAuthor = useSearchParams().get("author");
  const queryParamsId = useSearchParams().get("id");

  const [user, setUser] = useState<API<PrismaUser>>(null);
  const [translations, setTranslations] = useState<API<ManyData<PrismaLanguage>>>(null);
  console.log("translations", translations);
  const [authorTranslations, setAuthorTranslations] =
    useState<API<ManyData<PrismaAuthorTranslation>>>(null);
  console.log("authorTranslations", authorTranslations);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  console.log("state", state);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SEARCHING":
        return { ...state, status: "searching" };

      case "SET_STATUS":
        return { ...state, status: action.payload };

      case "SET_LANGUAGE":
        return { ...state, language: action.payload };

      case "SET_ORIGINAL_LANGUAGE":
        return { ...state, originalLanguage: action.payload };

      case "SET_WIKI_DATA":
        return { ...state, wikiData: action.payload };

      case "SET_NAMES":
        return { ...state, names: action.payload };

      case "SET_DESCRIPTIONS":
        return { ...state, descriptions: action.payload };

      case "SET_BIOS":
        return { ...state, bio: action.payload };

      case "RESET":
        return initialState;

      default:
        return state;
    }
  }

  async function addAuthor() {
    if (!user || !queryParamsAuthor || !translations || !authorTranslations) return;

    const body: UpdateAuthorClientSide = {
      englishName: queryParamsAuthor,
      translations: state.names.map((name, index) => {
        return {
          translationId: authorTranslations?.data[index].id,
          isOriginal: state.originalLanguage === name.code,
          name: name.name,
          description: state.descriptions[index].description,
          bio: state.bio[index].bio,
        };
      }),
    };

    await fetch(`api/edit/${queryParamsId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .catch((error) => console.error("Error: ", error))
      .finally(() => dispatch({ type: "SET_STATUS", payload: "submitted" }));
  }

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

    dispatch({
      type: "SET_STATUS",
      payload: "valid",
    });

    fetchDatas();
  }, []);

  useEffect(() => {
    async function fetchAuthorData() {
      const data = await fetch(`/api/edit/${queryParamsId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ERREUR :
      // ICI IL Y A UN PROBLEME CAR QUAND ON RAJOUTE UNE NOUVELLE LANGUE ENTRE TEMPS,
      // IL NEST PAS POSSIBLE DE LA MODIFIER CAR ELLE NEST PAS DANS LA LISTE
      // IL FAUT DONC FAIRE UNE REQUETE AVEC TOUTES LES LANGUES POSSIBLES
      // AIDE : IL FAUT CHANGER LE STATE EN RAJOUTANT TOUTES LES LANGUES DU TABLEAU PRISMA LANGUAGES
      await data.json().then((data: PrismaAuthor) => {
        setAuthorTranslations({ count: data.translations.length, data: data.translations });

        dispatch({
          type: "SET_NAMES",
          payload: data.translations.map((translation) => {
            return { code: translation.language.code, name: translation.name };
          }),
        });
        dispatch({
          type: "SET_DESCRIPTIONS",
          payload: data.translations.map((translation) => {
            return { code: translation.language.code, description: translation.description ?? "" };
          }),
        });
        dispatch({
          type: "SET_BIOS",
          payload: data.translations.map((translation) => {
            return { code: translation.language.code, bio: translation.bio ?? "" };
          }),
        });
      });
    }

    fetchAuthorData();
  }, [queryParamsId, translations?.data]);

  useEffect(() => {
    function isOk(res: API<wikiSummary>) {
      const isResDefined = !!res;

      dispatch({
        type: "SET_WIKI_DATA",
        payload: isResDefined ? res : undefined,
      });
    }

    async function searchAuthor() {
      queryParamsAuthor &&
        (await getWikiData(queryParamsAuthor).then((res) => {
          isOk(res);
        }));
    }

    searchAuthor();
  }, [queryParamsAuthor]);

  if (state.status === "submitted") {
    return <AuthorSubmitted state={state} dispatch={dispatch} text={"edited"} />;
  }

  return (
    user &&
    translations &&
    state.names.length > 0 &&
    (nameIndexFinder || nameIndexFinder === 0) && (
      <AuthCheck>
        <section className="flex flex-col gap-4">
          <>
            <Preview state={state} />

            <EditorWrapper
              LanguageComponent={
                <Language translations={translations.data} state={state} dispatch={dispatch} />
              }
            >
              <Name translations={translations.data} state={state} dispatch={dispatch} />
              <Description translations={translations.data} state={state} dispatch={dispatch} />
              <Bio translations={translations.data} state={state} dispatch={dispatch} />
              <SubmitBtn handleData={addAuthor} />
            </EditorWrapper>
          </>
        </section>
      </AuthCheck>
    )
  );
}
