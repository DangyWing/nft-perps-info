import { clearingHouseContract } from "./clearingHouseContract";
import { type Address } from "viem";

// todo: calculate potential liquidation price based on margin ratio compared to min margin ratio

export async function getMarginRatio({
  ammAddress,
  traderAddress,
}: {
  ammAddress: Address;
  traderAddress: Address;
}) {
  const res = await clearingHouseContract.read.getMarginRatio([
    ammAddress,
    traderAddress,
  ]);

  return res.marginRatio;
}
