import { type Address } from "viem";
import { clearingHouseContract } from "./clearingHouseContract";
import { AMMData } from "~/constants/constants";

export async function getPositionNotionalAndUnrealizedPnl({
  ammAddress,
  traderAddress,
}: {
  ammAddress: Address;
  traderAddress: Address;
}) {
  const res =
    await clearingHouseContract.read.getPositionNotionalAndUnrealizedPnl([
      ammAddress,
      traderAddress,
      // _pnlCalcOption = 0, for spot?
      // _pnlCalcOption = 1, for twap?
      0,
    ]);

  const ammData = AMMData.find((amm) => amm.nftPerpAmmAddress === ammAddress);
  return {
    ammName: ammData?.ammName,
    trader: traderAddress,
    ammAddress: ammAddress,
    positionNotional: res[0].positionNotional,
    unrealizedPnl: res[1].unrealizedPnl,
  };
}
