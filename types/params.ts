export type Params = {
  language?: string;
  maxLength?: number;
  minLength?: number;
  tag?: string;
  author?: string;

  limit?: number;

  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;

  query?: string | null;
};

export type ParamsKeys = keyof Params;
