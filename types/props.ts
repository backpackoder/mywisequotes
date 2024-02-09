// Types
import { Items } from "./navbar";
import { DispatchQuotesAndAuthors } from "./authors";
import { User } from "@prisma/client";
import { PrismaAuthor, PrismaQuote } from "./prisma";
import { StaticImageData } from "next/image";

// LAYOUT
export type LayoutProps = {
  children: React.ReactNode;
};

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
  data: PrismaQuote[] | PrismaAuthor[];
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
  author: string | undefined;
  image?: {
    width?: number;
    height?: number;
  };
};

// QUOTES
export type QuoteItemProps = {
  // quote: PrismaQuote;
  quote: any;
};

// USER PROFILE
export type UserProfilePartsProps = {
  data: {
    username: string;
    name: string;
    image: string | StaticImageData;
    bio: string;
    nationality: string;
    role: JSX.Element | null;
  };
};

// SETTINGS
export type UserItemProps = {
  type: keyof User;
  user: User;
  handleModifiedData: () => void;
  Component: JSX.Element;
};

export type UserSettingsItemProps = {
  typeSettings: keyof User;
  user: User;
  handleModifiedData: () => void;
  Component: JSX.Element;
};
