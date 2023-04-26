import { type NfexDataResponse } from "~/types";
import { parseNfexData } from "~/utils/parseNfexData";
import { AMMData } from "~/constants/constants";
import type { AMMResponse, NftPerpData } from "~/types";

async function getNftPerpData() {
  const nftPerpData = [];
  for (const amm of AMMData) {
    const url = `https://api3.nftperp.xyz/${amm.AMM}`;
    const res = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = (await res.json()) as AMMResponse;

    const funding =
      Number(data.nextEstimatedFundingRateLong) > 0
        ? Number(data.nextEstimatedFundingRateShort) * 100
        : Number(data.nextEstimatedFundingRateLong) * 100;

    const indexToMarkDelta =
      (Math.abs(parseFloat(data.indexPrice) - parseFloat(data.markPrice)) /
        ((parseFloat(data.indexPrice) + parseFloat(data.markPrice)) / 2)) *
      100;

    const perpData: NftPerpData = {
      projectName: amm.label,
      nftPerpIndexPrice: data.indexPrice.toString(),
      nftPerpMarkPrice: data.markPrice.toString(),
      nftPerpFundingRate: funding.toString(),
      nftPerpIndexToMark: indexToMarkDelta,
    };

    nftPerpData.push(perpData);
  }
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
  const [nftexData, nftPerpData] = await Promise.all([
    await getNfexData(),
    await getNftPerpData(),
  ]);

  const perpData = nftexData.map((nftexData) => {
    const item = nftPerpData.find(
      (nftPerpData) => nftPerpData.projectName === nftexData.projectName
    );

    return {
      ...nftexData,
      ...item,
    };
  });

  return perpData;
}
