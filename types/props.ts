// Types
import { Authors, Quote, Quotes } from "./API";
import { Items } from "./navbar";
import { DispatchQuotesAndAuthors } from "./authors";

// LOGO
export type LogoProps = {
  m?: string;
  width?: number;
  height?: number;
};

// PARTS
export type PartsItemProps = {
  theme: "Quotes" | "Authors";
};

// NAVBAR
export type NavbarProps = {
  type: string;
  totalCount: number;
  dispatch: React.Dispatch<DispatchQuotesAndAuthors>;
};

export type NavbarItemsProps = {
  items: Items[];
};

// NAVIGATION
export type PaginationProps = {
  data: Quotes | Authors;
  state: any;
  dispatch: React.Dispatch<any>;
};

export type GoToPageItemProps = {
  data: any;
  state: any;
  dispatch: React.Dispatch<any>;
  direction: string;
  number: number;
};

// AUTHORS
export type InputAuthorProps = {
  searchParamsState: any;
  searchParamsDispatch: React.Dispatch<React.SetStateAction<any>>;
};

export type AuthorImgProps = {
  author: string;
  width?: number;
};

// QUOTES
export type QuoteItemProps = {
  quote: Quote;
};
