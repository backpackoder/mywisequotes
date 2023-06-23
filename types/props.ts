// Types
import { Authors, Quote, Quotes } from "./API";
import { Items } from "./navbar";
import { DispatchQuotesAndAuthors } from "./authors";
import { User } from "@prisma/client";

// LOGO
export type LogoProps = {
  m?: string;
  width?: number;
  height?: number;
};

// DISCOVER QUOTES AND AUTHORS
export type DiscoverQuotesAndAuthorsProps = {
  h2?: boolean;
  text: {
    catchphrase: {
      before: string;
      after: string;
    };
    link: {
      before: string;
      after: string;
    };
  };
};
export type DiscoverQuotesAndAuthorsItemProps = DiscoverQuotesAndAuthorsProps & {
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

// USER PROFILE
export type UserProfilePartsProps = {
  data: {
    name: string;
    image: string;
    bio: string;
    nationality: string;
  };
};

// SETTINGS
export type SettingsItemProps = {
  type: keyof User;
  user: User;
  handleModifiedData: () => void;
  Component: JSX.Element;
};
