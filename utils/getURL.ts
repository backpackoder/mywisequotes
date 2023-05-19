// Types
import { Params } from "@/types/params";

// Utils
import { urlParams } from "./urlParams";

// Commons
import { API_URL } from "@/commons/commons";

export function getURL(params: Params) {
  const url = Object.entries(API_URL)
    .map(([key, value]) => value)
    .find((value) => value === params.url);

  return `${url}?${urlParams(params)}`;
}
