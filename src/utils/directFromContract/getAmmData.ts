import { AmmABI } from "../../constants/AmmAbi";
import { publicClient } from "../viemClient";
import { AMMData } from "../../constants/constants";

import { type MulticallContracts, type ResultType } from "../../types";

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
    fundingRateLong?: bigint;
    fundingRateShort?: bigint;
    markPrice?: bigint;
    indexPrice?: bigint;
    ammName: string;
    nftPerpAmmAddress: string;
  };

  const cleanResults: CleanResults[] = [];

  results.forEach((result, idx) => {
    if (result.error) {
      console.log(result.error);
    }

    const ammIdx = cleanResults.findIndex(
      (cleanResult) => cleanResult.ammName === ammDataCombined[idx]?.ammName
    );

    const res = result.result;

    const fundingRateLong = Array.isArray(res)
      ? res[0]?.fundingRateLong
      : undefined;

    const fundingRateShort = Array.isArray(res)
      ? res[1]?.fundingRateShort
      : undefined;

    const markPrice = !!res && "markPrice" in res ? res.markPrice : undefined;
    const indexPrice =
      !!res && "indexPrice" in res ? res.indexPrice : undefined;

    const ammName = ammDataCombined[idx]?.ammName;
    const nftPerpAmmAddress = ammDataCombined[idx]?.nftPerpAmmAddress;

    if (ammName && nftPerpAmmAddress) {
      if (ammIdx === -1) {
        cleanResults.push({
          ammName: ammName,
          nftPerpAmmAddress: nftPerpAmmAddress,
          fundingRateLong: fundingRateLong,
          fundingRateShort: fundingRateShort,
          markPrice: markPrice,
          indexPrice: indexPrice,
        });
      } else {
        cleanResults[ammIdx] = {
          ammName: cleanResults[ammIdx]?.ammName || ammName,
          nftPerpAmmAddress:
            cleanResults[ammIdx]?.nftPerpAmmAddress || nftPerpAmmAddress,
          fundingRateLong:
            cleanResults[ammIdx]?.fundingRateLong || fundingRateLong,
          fundingRateShort:
            cleanResults[ammIdx]?.fundingRateShort || fundingRateShort,
          markPrice: cleanResults[ammIdx]?.markPrice || markPrice,
          indexPrice: cleanResults[ammIdx]?.indexPrice || indexPrice,
        };
      }
    }
  });

  return cleanResults;
}
