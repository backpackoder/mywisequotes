// Types
import { Author, Authors, Quotes } from "./API";
import { Items } from "./navbar";

// PARTS
export type PartsItemProps = {
  theme: "Quotes" | "Authors";
};

// NAVBAR
export type NavbarProps = {
  type: string;
  data: Quotes | Authors;
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
  author: {
    name: string;
  };
  width?: number;
};
