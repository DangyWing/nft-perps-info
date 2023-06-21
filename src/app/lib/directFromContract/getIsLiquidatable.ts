import { clearingHouseContract } from "./clearingHouseContract";
import { type Address } from "viem";

export async function getIsLiquidatable({
  ammAddress,
  traderAddress,
}: {
  ammAddress: Address;
  traderAddress: Address;
}) {
  const res = await clearingHouseContract.read.isLiquidateable([
    ammAddress,
    traderAddress,
  ]);

  return res;
}
