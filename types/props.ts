// Types
import { Authors, Quotes } from "./API";

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
