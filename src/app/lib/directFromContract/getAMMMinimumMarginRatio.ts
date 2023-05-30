import { type Address } from "viem";
import { ammContract } from "./ammContract";

export async function getAMMMinimumMarginRatio({
  ammAddress,
}: {
  ammAddress: Address;
}) {
  const amm = ammContract({ ammAddress });

  const res = await amm.read.getMaintenanceMarginRatio();

  return res.maintenanceMarginRatio;
}
