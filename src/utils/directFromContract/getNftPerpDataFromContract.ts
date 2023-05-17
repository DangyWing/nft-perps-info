import { AMMData } from "~/constants/constants";
import { getAmmData } from "./getAmmData";
import { type NftPerpData } from "~/types";
import { calcPercentageDifference } from "../calculatePercentageDifference";
import { formatEther } from "viem";

export async function getNftPerpDataFromContract() {
  const data = await getAmmData();

  const nftPerpData: NftPerpData[] = [];

  data.forEach((value) => {
    const { nfexProjectName } =
      AMMData.find((amm) => amm.ammName === value.ammName) || {};
    if (!nfexProjectName || !value.fundingRate) return;

    const indexPrice = formatEther(value.getIndexPrice ?? BigInt(0));
    const markPrice = formatEther(value.getMarkPrice ?? BigInt(0));
    const fundingRateLong = formatEther(value.fundingRate[0] ?? BigInt(0));
    const fundingRateShort = formatEther(value.fundingRate[1] ?? BigInt(0));

    const fundingRate =
      parseFloat(fundingRateLong) > 0
        ? parseFloat(fundingRateShort) * 100
        : parseFloat(fundingRateLong) * 100;

    const fundingSide = parseFloat(fundingRateLong) > 0 ? "short" : "long";

    nftPerpData.push({
      projectName: nfexProjectName,
      nftPerpIndexPrice: indexPrice.toString(),
      nftPerpMarkPrice: markPrice.toString(),
      nftPerpFundingRate: fundingRate.toString(),
      nftPerpIndexToMark: calcPercentageDifference(
        parseFloat(markPrice),
        parseFloat(indexPrice)
      ),
      nftPerpSlug: value.ammName,
      nftPerpFundingSide: fundingSide,
    });
  });

  return nftPerpData;
}
