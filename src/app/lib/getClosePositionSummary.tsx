import { type Address } from "viem";

export type ClosePositionSummaryResponse = {
  status: string;
  data: ClosePositionSummary;
};

export type ClosePositionSummary = {
  outputNotional: string;
  outputMargin: string;
  exitPrice: string;
  priceImpact: string;
  fee: string;
  feeRatio: string;
  pnl: string;
  liquidationPrice: string;
  forcedPartialClose: boolean;
};

export async function getClosePositionSummary({
  ammName,
  walletAddress,
  closePercent,
}: {
  ammName: string;
  walletAddress: Address;
  closePercent: number;
}) {
  const url = `https://api3.nftperp.xyz/${ammName}/closepostransactionsummary/?trader=${walletAddress}&closePercent=${closePercent}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  // if (!res.ok) throw new Error("Failed to fetch close position summary");

  return (await res.json()) as ClosePositionSummaryResponse;
}
