import { type Address } from "viem";
import { ammContract } from "./ammContract";

export async function getAMMMarkPrice({ ammAddress }: { ammAddress: Address }) {
  const amm = ammContract({ ammAddress });

  const res = await amm.read.getMarkPrice();

  return res.markPrice;
}
