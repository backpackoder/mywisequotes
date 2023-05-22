// Types
import { Authors, Quotes } from "./API";
import { Items } from "./navbar";

// AUTHORS
export type InputAuthorProps = {
  searchParamsState: any;
  searchParamsDispatch: React.Dispatch<React.SetStateAction<any>>;
};

// NAVBAR
export type NavbarProps = {
  type: string;
  data: Quotes | Authors;
};

export type ItemsProps = {
  items: Items[];
};

// NAVIGATION
export type NavigationProps = {
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
