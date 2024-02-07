// Types
import { API } from "@/types/prisma";
import { wikiSummary } from "@/types/wikiResponse";
import { BioTranslation, DescriptionTranslation, NameTranslation, Status } from "../types";

export const initialState = {
  language: "en",
  status: null as Status,
  originalLanguage: null as string | null,
  wikiData: null as API<wikiSummary>,
  names: [] as NameTranslation[],
  descriptions: [] as DescriptionTranslation[],
  bio: [] as BioTranslation[],
};
