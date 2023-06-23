// Utils
import { getURL } from "@/utils/getURL";

// Types
import { Params } from "@/types/params";

export async function getData(params: Params) {
  const res = await fetch(getURL(params), { cache: "no-store" }).then((res) => res.json());

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  const data = await res;

  return data;
}
