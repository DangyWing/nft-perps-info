import { type NfexDataResponse } from "~/types";
import { parseNfexData } from "~/utils/parseNfexData";

export async function getNfexPerpData() {
  const res = await fetch("https://apigw.nfex.io/market/pairs?enable=0", {
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await res.json()) as NfexDataResponse;
  console.log(data);

  return parseNfexData(data);
}
