export type Params = {
  language?: string;
  maxLength?: number;
  minLength?: number;
  tag?: string;
  author?: string;

  slug?: string;
  limit?: number;

  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;

  query?: string | null;
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
