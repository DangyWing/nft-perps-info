import { type Address } from "viem";
import { getAMMMarkPrice } from "./getAMMMarkPrice";
import { getAMMMinimumMarginRatio } from "./getAMMMinimumMarginRatio";
import { getMarginRatio } from "./getMarginRatio";

export async function getPositionLiqPrice({
  ammAddress,
  traderAddress,
}: {
  ammAddress: Address;
  traderAddress: Address;
}) {
  const markPrice = await getAMMMarkPrice({ ammAddress });

  const minMaintenanceMargin = await getAMMMinimumMarginRatio({ ammAddress });

  const marginRatio = await getMarginRatio({ ammAddress, traderAddress });

  const liqPrice = markPrice - (minMaintenanceMargin - marginRatio) * markPrice;

  return liqPrice;
}
