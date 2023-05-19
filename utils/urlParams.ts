// Types
import { Params } from "@/types/params";

export function urlParams(params: Params) {
  const url = Object.entries(params)
    .map(([key, value]) => (key === "url" ? null : `${key}=${value}`))
    .join("&");

  return url;
}
