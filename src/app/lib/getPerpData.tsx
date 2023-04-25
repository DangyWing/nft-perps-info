import { type NfexDataResponse } from "~/types";
import { parseNfexData } from "~/utils/parseNfexData";
import { AMMData } from "~/constants/constants";
import { type AMMResponse } from "~/types";
import { type NftPerpData } from "~/components/perpDataTable/perpDataTable";

async function getNftPerpData() {
  const nftPerpData = [];
  for (const amm of AMMData) {
    const url = `https://api3.nftperp.xyz/${amm.AMM}`;
    const res = await fetch(url, {
      next: {
        revalidate: 100,
      },
    });

    const { data } = (await res.json()) as AMMResponse;

    const funding =
      Number(data.nextEstimatedFundingRateLong) > 0
        ? Math.abs(Number(data.nextEstimatedFundingRateShort) * 100)
        : Math.abs(Number(data.nextEstimatedFundingRateLong) * 100);

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
      source: "nftperp",
    };

    nftPerpData.push(perpData);
  }
  return nftPerpData;
}

async function getNftexData() {
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
    await getNftexData(),
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
