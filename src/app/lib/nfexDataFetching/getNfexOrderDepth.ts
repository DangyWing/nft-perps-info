import { type NfexDepthResponse } from "~/types";

function splitDepthString(depthString: string) {
  const [price, size] = depthString.split(",");

  return { price: price ?? "0", size: size ?? "0" };
}

export async function getNfexPairOrderDepth({
  symbolId,
}: {
  symbolId: number;
}) {
  const url = `https://apigw.nfex.io/market/depth?trade_pair_id=${symbolId}`;

  const res = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await res.json()) as NfexDepthResponse;

  const lowestAsk = data.sell[0];
  const highestBid = data.buy[0];

  if (!lowestAsk || !highestBid) return undefined;

  return {
    lowestAsk: splitDepthString(lowestAsk),
    highestBid: splitDepthString(highestBid),
  };
}
