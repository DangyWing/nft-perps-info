import { type NfexDataResponse } from "~/types";
import { parseNfexData } from "~/utils/parseNfexData";
import { AMMData } from "~/constants/constants";
import type { AMMResponse, NftPerpData, PerpData } from "~/types";
import { calculate_percentage_change } from "~/utils/utils";

async function getNftPerpData() {
  const nftPerpData = [];
  for (const amm of AMMData) {
    const url = `https://api3.nftperp.xyz/${amm.AMM}`;
    const res = await fetch(url, {
      next: {
        revalidate: 30,
      },
    });

    const { data } = (await res.json()) as AMMResponse;

    const funding =
      Number(data.nextEstimatedFundingRateLong) > 0
        ? Number(data.nextEstimatedFundingRateShort) * 100
        : Number(data.nextEstimatedFundingRateLong) * 100;

    const fundingSide =
      parseFloat(data.nextEstimatedFundingRateLong) > 0 ? "Short" : "Long";

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
      nftPerpSlug: amm.AMM,
      nftPerpFundingSide: fundingSide,
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
  const [nfexData, nftPerpData] = await Promise.all([
    await getNfexData(),
    await getNftPerpData(),
  ]);

  const combinedPerpData = [];

  for (const nftPerp of nftPerpData) {
    const nfexDataItem = nfexData.find(
      (nfexData) => nfexData.projectName === nftPerp.projectName
    );

    if (!nfexDataItem) {
      return new Error("Failed to find nfexDataItem");
    }

    const nftPerpMarkToNfexMark = calculate_percentage_change(
      parseFloat(nftPerp.nftPerpMarkPrice),
      parseFloat(nfexDataItem.markPrice)
    );

    const perpData: PerpData = {
      nftPerpMarkToNfexMark,
      ...nftPerp,
      ...nfexDataItem,
    };

    combinedPerpData.push(perpData);
  }

  return combinedPerpData.sort((a, b) =>
    a.nftPerpMarkToNfexMark === null
      ? 1
      : b.nftPerpMarkToNfexMark === null
      ? -1
      : b.nftPerpMarkToNfexMark - a.nftPerpMarkToNfexMark
  );
}
