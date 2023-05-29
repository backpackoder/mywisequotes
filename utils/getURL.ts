// Types
import { Params } from "@/types/params";

// Commons
import { API_URL } from "@/commons/commons";

export function getURL(params: Params) {
  const url = Object.entries(API_URL)
    .map(([key, value]) => value)
    .find((value) => value === params.url);

  console.log("URL", `${url}?${urlParams(params)}`);

  return `${url}?${urlParams(params)}`;
}

function urlParams(params: Params) {
  const url = Object.entries(params)
    .map(([key, value]) => (key === "url" ? null : `${key}=${value}`))
    .join("&");

  return url;
}
