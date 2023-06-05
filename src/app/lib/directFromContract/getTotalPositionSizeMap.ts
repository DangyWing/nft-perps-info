import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { publicClient } from "../../../utils/viemClient";
import { AMMData } from "~/constants/constants";

import { type MulticallContracts } from "~/types";

const ammDataCombined: {
  ammName: string;
  nftPerpAmmAddress: string;
}[] = [];

const baycAddress = AMMData[0]?.nftPerpAmmAddress ?? "0x0";
const ClearingHouseAddress = "0x6fc05B7DFe545cd488E9D47d56CFaCA88F69A2e1";

async function getTotalPositionSizeForInference() {
  return await publicClient.readContract({
    address: ClearingHouseAddress,
    abi: ClearingHouseAbi,
    functionName: "totalPositionSizeMap",
    args: [baycAddress],
  });
}

type TotalPositionSizeMapType = Awaited<
  ReturnType<typeof getTotalPositionSizeForInference>
>;

export type TotalPositionResultType =
  | {
      error: Error;
      result: undefined;
      status: "failure";
    }
  | {
      error: undefined;
      result: TotalPositionSizeMapType;
      status: "success";
    };

const contracts: MulticallContracts = [];

AMMData.forEach((contract) => {
  ammDataCombined.push({
    ammName: contract.ammName,
    nftPerpAmmAddress: contract.nftPerpAmmAddress,
  });

  contracts.push({
    address: ClearingHouseAddress,
    abi: ClearingHouseAbi,
    functionName: "totalPositionSizeMap",
    args: [contract.nftPerpAmmAddress],
  });
});

export async function getTotalPositionSize() {
  const results = (await publicClient.multicall({
    contracts: contracts,
  })) as TotalPositionResultType[];

  type CleanResults = {
    ammName: string;
    nftPerpAmmAddress: string;
    netPositionSize: bigint;
    positionSizeLong: bigint;
    positionSizeShort: bigint;
  };

  const cleanResults: CleanResults[] = [];

  results.forEach((result, idx) => {
    if (result.error) {
      console.log(result.error);
    }

    if (result.status !== "success") {
      console.log("no results");
      return;
    }

    const resDestructured = result.result;

    // refactor to destructure in line maybe?

    const netPositionSizeDes = resDestructured?.[0].netPositionSize;
    const positionSizeLongDes = resDestructured?.[1].positionSizeLong;
    const positionSizeShortDes = resDestructured?.[2].positionSizeShort;

    const ammName = ammDataCombined[idx]?.ammName;
    const nftPerpAmmAddress = ammDataCombined[idx]?.nftPerpAmmAddress;

    if (ammName && nftPerpAmmAddress) {
      cleanResults.push({
        ammName: ammName,
        nftPerpAmmAddress: nftPerpAmmAddress,
        netPositionSize: netPositionSizeDes,
        positionSizeLong: positionSizeLongDes,
        positionSizeShort: positionSizeShortDes,
      });
    }
  });

  return cleanResults;
}
