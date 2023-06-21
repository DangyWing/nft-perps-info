import type { PerpData } from "~/types";
import { percentageChangeFromBase } from "~/utils/utils";
import { getNfexPerpData } from "./getNfexPerpData";
import { getNftPerpDataFromContract } from "~/app/lib/directFromContract/getNftPerpDataFromContract";
import { getTotalPositionSize } from "./directFromContract/getTotalPositionSizeMap";
import { type getAllBlurBidData } from "./getAllBlurBidData";
import { getCollectionSlugFromAmmAddress } from "~/utils/fetchFromConstant/getCollectionSlugFromAmmAddress";

import { formatEther } from "viem";

type BlurBidData = Awaited<ReturnType<typeof getAllBlurBidData>>;

export async function getPerpData({
  blurBidData,
}: {
  blurBidData: BlurBidData;
}) {
  const [nfexData, nftPerpData, nftPerpPositionSizeData] = await Promise.all([
    await getNfexPerpData(),
    await getNftPerpDataFromContract(),
    await getTotalPositionSize(),
  ]);

  const combinedPerpData = [];

  for (const nftPerp of nftPerpData) {
    const nfexDataItem = nfexData.find(
      (nfexData) => nfexData.projectName === nftPerp.projectName
    );

    if (!nfexDataItem) {
      return new Error("Failed to find nfexDataItem");
    }
    const collectionSlug = getCollectionSlugFromAmmAddress(
      nftPerp.nftPerpAmmAddress
    );

    const blurBidDataItem = blurBidData.find(
      (blurBidData) => blurBidData?.collectionSlug === collectionSlug
    );

    const nftPerpPositionSize = nftPerpPositionSizeData.find(
      (nftPerpPositionSizeData) =>
        nftPerpPositionSizeData.ammName === nftPerp.nftPerpSlug
    );

    if (!nftPerpPositionSize) {
      return new Error("Failed to find nftPerpPositionSize");
    }

    const nftPerpMarkToNfexIndex = percentageChangeFromBase(
      parseFloat(nfexDataItem.indexPrice),
      parseFloat(nftPerp.nftPerpMarkPrice)
    ).toFixed(4);

    const positionSizeLong = parseFloat(
      formatEther(nftPerpPositionSize.positionSizeLong)
    );

    const positionSizeShort = parseFloat(
      formatEther(nftPerpPositionSize.positionSizeShort)
    );

    const longRatio =
      (positionSizeLong / (positionSizeLong + positionSizeShort)) * 100;

    const relevantRatio =
      nftPerpPositionSize.positionSizeLong >
      nftPerpPositionSize.positionSizeShort
        ? longRatio.toFixed(2)
        : "-" + (100 - longRatio).toFixed(2);

    const topBlurBid = blurBidDataItem
      ? blurBidDataItem.priceLevels.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        )[0]?.price ?? "N/A"
      : "N/A";

    const perpData: PerpData = {
      nftPerpMarkToNfexIndex,
      ...nftPerp,
      ...nfexDataItem,
      nftPerpNetPositionSize: nftPerpPositionSize.netPositionSize ?? "",
      nftPerpPositionSizeLong: nftPerpPositionSize.positionSizeLong ?? "",
      nftPerpPositionSizeShort: nftPerpPositionSize.positionSizeShort ?? "",
      nftPerpPositionRatio: relevantRatio,
      topBlurBid: topBlurBid,
    };

    combinedPerpData.push(perpData);
  }

  return combinedPerpData.sort((a, b) =>
    a.nftPerpMarkToNfexIndex === null
      ? 1
      : b.nftPerpMarkToNfexIndex === null
      ? -1
      : Math.abs(parseFloat(b.nftPerpMarkToNfexIndex)) -
        Math.abs(parseFloat(a.nftPerpMarkToNfexIndex))
  );
}
