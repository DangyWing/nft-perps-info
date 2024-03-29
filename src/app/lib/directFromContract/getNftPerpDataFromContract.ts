import { AMMData } from "~/constants/constants";
import { getAmmData } from "./getAmmData";
import { type NftPerpData } from "~/types";
import { calcPercentageDifference } from "~/utils/calculatePercentageDifference";
import { formatEther } from "viem";
import { calculateDivergenceFee } from "~/utils/calculateDivergenceFee";

export async function getNftPerpDataFromContract() {
  const data = await getAmmData();

  const nftPerpData: NftPerpData[] = [];

  data.forEach((value) => {
    const { nfexProjectName } =
      AMMData.find((amm) => amm.ammName === value.ammName) || {};

    if (!nfexProjectName || !value.fundingRateLong || !value.fundingRateShort)
      return;

    const indexPrice = formatEther(value.indexPrice ?? BigInt(0));
    const markPrice = formatEther(value.markPrice ?? BigInt(0));
    const fundingRateLong = formatEther(value.fundingRateLong);
    const fundingRateShort = formatEther(value.fundingRateShort);

    const fundingRate =
      parseFloat(fundingRateLong) > 0
        ? parseFloat(fundingRateShort) * 100
        : parseFloat(fundingRateLong) * 100;

    const fundingSide = parseFloat(fundingRateLong) > 0 ? "short" : "long";

    const markToIndexDelta = calcPercentageDifference(
      parseFloat(markPrice),
      parseFloat(indexPrice)
    );

    const { longFee, shortFee } = calculateDivergenceFee(markToIndexDelta);

    const dynamicFeeStatus =
      longFee === 0 && shortFee === 0
        ? ""
        : markToIndexDelta > 0
        ? "short"
        : "long";

    nftPerpData.push({
      projectName: nfexProjectName,
      nftPerpIndexPrice: indexPrice.toString(),
      nftPerpMarkPrice: markPrice.toString(),
      nftPerpFundingRate: fundingRate.toString(),
      nftPerpMarkToIndex: markToIndexDelta.toFixed(4),
      nftPerpSlug: value.ammName,
      nftPerpFundingSide: fundingSide,
      nftPerpAmmAddress: value.nftPerpAmmAddress,
      nftPerpDynamicFeeStatus: dynamicFeeStatus,
    });
  });

  return nftPerpData;
}
