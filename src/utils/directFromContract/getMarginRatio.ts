import { clearingHouseContract } from "./clearingHouseContract";
import { type Address } from "viem";
import { AMMData } from "~/constants/constants";

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

  // const ammData = AMMData.find((amm) => amm.nftPerpAmmAddress === ammAddress);

  return res.marginRatio;
}

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
  };
}

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
