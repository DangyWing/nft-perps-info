import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { ClearingHouseAddress } from "~/constants/constants";
import type { Address } from "viem";
import { publicClient } from "~/utils/viemClient";

export type ActiveTraderPositions = {
  ammAddress: Address;
  trader: Address;
};

type ResultType<T> =
  | {
      error: Error;
      result: undefined;
      status: "failure";
      ammAddress: Address;
      trader: Address;
    }
  | {
      error: undefined;
      result: T;
      status: "success";
      ammAddress: Address;
      trader: Address;
    };

type MulticallResult = [ResultType<boolean>];

export async function getManyIsLiquidateable({
  activePositions,
}: {
  activePositions: ActiveTraderPositions[];
}) {
  const contracts = activePositions.map((activePosition) => ({
    address: ClearingHouseAddress,
    abi: ClearingHouseAbi,
    functionName: "isLiquidateable",
    args: [activePosition.ammAddress, activePosition.trader],
  }));

  const multicallResult = (await publicClient.multicall({
    contracts: contracts,
  })) as MulticallResult;

  return multicallResult.map((result) => {
    return {
      status: result.status,
      ammAddress: result.ammAddress,
      trader: result.trader,
      isLiquidatable: result.status === "success" ? result.result : undefined,
    };
  });
}
