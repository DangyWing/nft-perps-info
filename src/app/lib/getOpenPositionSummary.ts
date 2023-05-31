import { type Address } from "viem";

export type OpenPositionSummaryResponse = {
  status: string;
  data: OpenPositionSummary;
};

export type OpenPositionSummary = {
  outputSize: string;
  entryPrice: string;
  priceImpact: string;
  fee: string;
  feeRatio: string;
  totalCost: string;
  liquidationPrice: string;
  surgeFee: boolean;
  loweredFee: boolean;
};

export async function getOpenPositionSummary({
  ammName,
  walletAddress,
  notionalAmount,
  leverage,
  side,
}: {
  ammName: string;
  walletAddress: Address;
  notionalAmount: number;
  leverage: number;
  side: "BUY" | "SELL";
}) {
  const url = `https://api3.nftperp.xyz/${ammName}/transactionsummary?trader=${walletAddress}&amount=${notionalAmount}&leverage=${leverage}&side=${side}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  return (await res.json()) as OpenPositionSummaryResponse;
}
