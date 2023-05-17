import { type NfexDataResponse } from "~/types";
import { parseNfexData } from "~/utils/parseNfexData";

export async function getNfexPerpData() {
  const res = await fetch("https://apigw.nfex.io/market/pairs", {
    next: {
      revalidate: 5,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await res.json()) as NfexDataResponse;

  return parseNfexData(data);
}
