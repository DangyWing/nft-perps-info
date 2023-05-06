import { type NfexDataResponse } from "~/types";
import { parseNfexData } from "~/utils/parseNfexData";
import { AMMData } from "~/constants/constants";
import type { NftPerpData, AllAmmsDataResponse } from "~/types";
import { calculate_percentage_change } from "~/utils/utils";

async function getNftPerpData() {
  const nftPerpData: NftPerpData[] = [];
  const res = await fetch("https://api3.nftperp.xyz/amms", {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await res.json()) as AllAmmsDataResponse;

  Object.entries(data).map(([, value]) => {
    const funding =
      Number(value.nextEstimatedFundingRateLong) > 0
        ? Number(value.nextEstimatedFundingRateShort) * 100
        : Number(value.nextEstimatedFundingRateLong) * 100;

    const fundingSide =
      parseFloat(value.nextEstimatedFundingRateLong) > 0 ? "Short" : "Long";

    const indexToMarkDelta =
      (Math.abs(parseFloat(value.indexPrice) - parseFloat(value.markPrice)) /
        ((parseFloat(value.indexPrice) + parseFloat(value.markPrice)) / 2)) *
      100;

    const { label } = AMMData.find((amm) => amm.AMM === value.ammName) || {};

    if (!label) {
      // no AMMData found for this AMM
      return;
    }

    const perpData: NftPerpData = {
      projectName: label,
      nftPerpIndexPrice: value.indexPrice.toString(),
      nftPerpMarkPrice: value.markPrice.toString(),
      nftPerpFundingRate: funding.toString(),
      nftPerpIndexToMark: indexToMarkDelta,
      nftPerpSlug: value.ammName,
      nftPerpFundingSide: fundingSide,
    };
    nftPerpData.push(perpData);
  });
  return nftPerpData;
}

async function getNfexData() {
  const res = await fetch("https://apigw.nfex.io/market/pairs", {
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await res.json()) as NfexDataResponse;

  return parseNfexData(data);
}

export async function getPerpData() {
  const [nfexData, nftPerpData] = await Promise.all([
    await getNfexData(),
    await getNftPerpData(),
  ]);

  const perpData = nfexData
    .map((nfexData) => {
      const item = nftPerpData.find(
        (nftPerpData) => nftPerpData.projectName === nfexData.projectName
      );

      const nftPerpMarkToNfexMark =
        !item?.nftPerpMarkPrice || !nfexData?.markPrice
          ? null
          : calculate_percentage_change(
              parseFloat(item.nftPerpMarkPrice),
              parseFloat(nfexData.markPrice)
            );

      return {
        nftPerpMarkToNfexMark,
        ...nfexData,
        ...item,
      };
    })
    .sort((a, b) =>
      a.nftPerpMarkToNfexMark === null
        ? 1
        : b.nftPerpMarkToNfexMark === null
        ? -1
        : b.nftPerpMarkToNfexMark - a.nftPerpMarkToNfexMark
    )
    .map((obj, index, arr) => ({
      ...obj,
      sortValue: obj.nftPerpMarkToNfexMark ? arr.length - index : 0,
    }));

  return perpData;
}
