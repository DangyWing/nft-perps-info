import type { PerpData } from "~/types";
import { calculate_percentage_change } from "~/utils/utils";
import { getNftPerpData } from "./getNftPerpData";
import { getNfexPerpData } from "./getNfexPerpData";

export async function getPerpData() {
  const [nfexData, nftPerpData] = await Promise.all([
    await getNfexPerpData(),
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

    const nftPerpMarkToNfexIndex = calculate_percentage_change(
      parseFloat(nftPerp.nftPerpMarkPrice),
      parseFloat(nfexDataItem.indexPrice)
    );

    const perpData: PerpData = {
      nftPerpMarkToNfexIndex,
      ...nftPerp,
      ...nfexDataItem,
    };

    combinedPerpData.push(perpData);
  }

  return combinedPerpData.sort((a, b) =>
    a.nftPerpMarkToNfexIndex === null
      ? 1
      : b.nftPerpMarkToNfexIndex === null
      ? -1
      : b.nftPerpMarkToNfexIndex - a.nftPerpMarkToNfexIndex
  );
}
