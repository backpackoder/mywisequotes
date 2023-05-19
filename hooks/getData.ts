// Types
import { Params } from "@/types/params";

// Utils
import { getURL } from "@/utils/getURL";
import axios from "axios";

export async function useGetData(params: Params) {
  const res = await axios.get(getURL(params));

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  const data: any = await res.data;

  return data;
}
