import { parseEther } from "viem";

export function calcSlippageQuoteAssetAmount(
  side: "long" | "short",
  outputNotional: `${number}` | undefined,
  slippagePercent: string | number | undefined
) {
  if (!slippagePercent) return BigInt(0);
  if (!outputNotional) return new Error("outputNotional is undefined");
  if (typeof slippagePercent === "string")
    return new Error("slippagePercent is a string");

  const slippageAmountNum =
    (parseFloat(outputNotional) * slippagePercent) / 100;

  const returnValue =
    side === "long"
      ? parseFloat(outputNotional) - slippageAmountNum
      : parseFloat(outputNotional) + slippageAmountNum;

  return parseEther(returnValue.toString() as `${number}`);
}
