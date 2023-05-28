// Types
import { Params } from "@/types/params";

// Utils
import { getURL } from "@/utils/getURL";

export async function getData(params: Params) {
  const res = await fetch(getURL(params), { cache: "no-store" }).then((res) => res.json());

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  const data = await res;

  return data;
}
