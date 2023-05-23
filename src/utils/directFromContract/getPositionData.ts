import { clearingHouseContract } from "./clearingHouseContract";
import { type Address } from "viem";
import { AMMData } from "~/constants/constants";

export async function getPositionData({
  ammAddress,
  traderAddress,
}: {
  ammAddress: Address;
  traderAddress: Address;
}) {
  const res = await clearingHouseContract.read.getPosition([
    ammAddress,
    traderAddress,
  ]);

  const ammData = AMMData.find((amm) => amm.nftPerpAmmAddress === ammAddress);

  return {
    ammName: ammData?.ammName,
    trader: traderAddress,
    ammAddress: ammAddress,
    positionSize: res.size.size,
    positionMargin: res.margin.margin,
    openNotional: res.openNotional.openNotional,
    margin: res.margin.margin,
  };
}
