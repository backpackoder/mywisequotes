// Types
import { Params } from "@/types/params";

// Utils
import { getURL } from "@/utils/getURL";
import axios from "axios";

export async function getData(params: Params) {
  // const res = await axios.get(getURL(params));
  const res = await fetch(getURL(params), { cache: "no-store" }).then((res) => res.json());

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  const data: any = await res;

  return data;
}
