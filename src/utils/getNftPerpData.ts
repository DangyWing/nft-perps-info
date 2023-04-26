import { type Amm } from "@nftperp/sdk/types";
import type { AMMResponse, PerpData } from "~/types";
import { AMMData } from "~/constants/constants";

async function getNftPerpData({ amm }: { amm: Amm }) {
  const url = `https://api3.nftperp.xyz/${amm}`;
  const res = await fetch(url, {
    next: {
      revalidate: 100,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await res.json()) as AMMResponse;

  return data;
}

export const getAllNftPerpData = async () => {
  const nftPerpData = [];

  for (const amm of AMMData) {
    const collectionInfo = await getNftPerpData({ amm: amm.AMM });

    const funding =
      Number(collectionInfo.nextEstimatedFundingRateLong) > 0
        ? Math.abs(Number(collectionInfo.nextEstimatedFundingRateShort) * 100)
        : Math.abs(Number(collectionInfo.nextEstimatedFundingRateLong) * 100);

    const indexToMarkDelta =
      (Math.abs(
        parseFloat(collectionInfo.indexPrice) -
          parseFloat(collectionInfo.markPrice)
      ) /
        ((parseFloat(collectionInfo.indexPrice) +
          parseFloat(collectionInfo.markPrice)) /
          2)) *
      100;

    const perpData: PerpData = {
      projectName: amm.label,
      indexPrice: collectionInfo.indexPrice.toString(),
      markPrice: collectionInfo.markPrice.toString(),
      fundingRate: funding.toString(),
      indexToMark: indexToMarkDelta,
    };

    nftPerpData.push(perpData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  return nftPerpData;
};
