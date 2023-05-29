// Types
import { ParamsKeys } from "./params";

export type DispatchQuotesAndAuthors = {
  type: string;
  payload: string;
};

export type DispatchQuotesAndAuthorsPayload = {
  [key: string]: string;
};
