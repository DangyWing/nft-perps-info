import { type NfexDataResponse } from "~/types";

export async function getNfexFundingData({
  startTimestamp,
  endTimestamp,
}: {
  startTimestamp: string;
  endTimestamp: string;
}) {
  const url = `https://apigw.nfex.io/market/settleFundRateList?begin_ts={startTimestamp.toString()}&end_ts={endTimestamp.toString()}`;

  const res = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await res.json()) as NfexDataResponse;

  // return parseNfexData(data);
  return data;
}
