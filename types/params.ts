export type Params = {
  url: string;

  maxLength?: number;
  minLength?: number;
  tags?: string;
  author?: string;

  limit?: number;

  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  slug?: string;

  query?: string | null;
  fields?: string;
  fuzzyMaxEdits?: number;
  fuzzyMaxExpansions?: number;

  autocomplete?: boolean;
  matchThreshold?: number;

  _id?: string;
};

export type ParamsKeys = keyof Params;

// export type Params_RandomQuotes = {
//   limit?: number;
//   maxLength?: number;
//   minLength?: number;
//   tags?: string;
//   author?: string;
//   authorId?: string;
// };

// export type Params_ListQuotes = {
//   limit?: number;
//   maxLength?: number;
//   minLength?: number;
//   tags?: string;
//   author?: string;
//   authorId?: string;
//   sortBy?: string;
//   order?: string;
//   page?: number;
// };
