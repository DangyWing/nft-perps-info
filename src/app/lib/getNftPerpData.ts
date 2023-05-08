import { AMMData } from "~/constants/constants";
import { type AllAmmsDataResponse, type NftPerpData } from "~/types";

export async function getNftPerpData() {
  const nftPerpData: NftPerpData[] = [];
  const res = await fetch("https://api3.nftperp.xyz/amms", {
    next: {
      revalidate: 30,
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

    const { label } =
      AMMData.find((amm) => amm.ammName === value.ammName) || {};

    if (!label) {
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
