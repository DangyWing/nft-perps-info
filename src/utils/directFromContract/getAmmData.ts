import { AmmABI } from "../../constants/AmmAbi";
import { publicClient } from "../viemClient";
import { AMMData } from "../../constants/constants";

import {
  type TupleResultType,
  type MulticallContracts,
  type ResultType,
  type BasicResultType,
} from "../../types";

const functionNames = ["getMarkPrice", "getIndexPrice", "fundingRate"];

const ammDataCombined: {
  ammName: string;
  nftPerpAmmAddress: string;
  functionName: string;
}[] = [];

const contracts: MulticallContracts = [];

AMMData.forEach((contract) => {
  functionNames.forEach((functionName) => {
    ammDataCombined.push({
      ammName: contract.ammName,
      nftPerpAmmAddress: contract.nftPerpAmmAddress,
      functionName: functionName,
    });

    contracts.push({
      address: contract.nftPerpAmmAddress,
      abi: AmmABI,
      functionName: functionName,
    });
  });
});

export async function getAmmData() {
  const results = (await publicClient.multicall({
    contracts: contracts,
  })) as ResultType[];

  type CleanResults = {
    getMarkPrice?: BasicResultType;
    getIndexPrice?: BasicResultType;
    fundingRate?: TupleResultType;
    ammName: string;
    nftPerpAmmAddress: string;
  };

  const cleanResults: CleanResults[] = [];

  results.forEach((result, idx) => {
    const key = ammDataCombined[idx]?.functionName ?? "dunno";

    const ammNameIdx = cleanResults.findIndex(
      (cleanResult) => cleanResult.ammName === ammDataCombined[idx]?.ammName
    );

    const dataResult = Array.isArray(result?.result)
      ? result.result.map((result) => result.d)
      : result?.result?.d;

    const ammName = ammDataCombined[idx]?.ammName;
    const nftPerpAmmAddress = ammDataCombined[idx]?.nftPerpAmmAddress;

    if (ammNameIdx !== -1 && cleanResults[ammNameIdx] && result.result) {
      const existingValues = cleanResults[ammNameIdx];

      if (existingValues) {
        cleanResults[ammNameIdx] = {
          ...existingValues,
          [key]: dataResult,
        };
      }
    } else if (!!ammName && !!nftPerpAmmAddress) {
      cleanResults.push({
        ammName: ammName,
        nftPerpAmmAddress: nftPerpAmmAddress,
        [key]: dataResult,
      });
    }
  });

  return cleanResults;
}
