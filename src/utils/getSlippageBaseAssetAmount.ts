import { parseEther } from "viem";

export function getSlippageBaseAssetAmount(
  side: "long" | "short",
  baseAssetOut: `${number}` | undefined,
  slippagePercent: string | number | undefined
) {
  if (!slippagePercent) return BigInt(0);
  if (!baseAssetOut) return new Error("outputNotional is undefined");
  if (typeof slippagePercent === "string")
    return new Error("slippagePercent is a string");

  const slippageAmountNum = (parseFloat(baseAssetOut) * slippagePercent) / 100;

  const returnValue =
    side === "long"
      ? parseFloat(baseAssetOut) - slippageAmountNum
      : parseFloat(baseAssetOut) + slippageAmountNum;

  return parseEther(returnValue.toString() as `${number}`);
}
