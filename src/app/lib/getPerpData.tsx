import type { PerpData } from "~/types";
import { percentageChangeFromBase } from "~/utils/utils";
import { getNfexPerpData } from "./getNfexPerpData";
import { getNftPerpDataFromContract } from "~/app/lib/directFromContract/getNftPerpDataFromContract";

export async function getPerpData() {
  const [nfexData, nftPerpData] = await Promise.all([
    await getNfexPerpData(),
    await getNftPerpDataFromContract(),
  ]);

  const combinedPerpData = [];

  for (const nftPerp of nftPerpData) {
    const nfexDataItem = nfexData.find(
      (nfexData) => nfexData.projectName === nftPerp.projectName
    );

    if (!nfexDataItem) {
      return new Error("Failed to find nfexDataItem");
    }

    const nftPerpMarkToNfexIndex = percentageChangeFromBase(
      parseFloat(nfexDataItem.indexPrice),
      parseFloat(nftPerp.nftPerpMarkPrice)
    ).toFixed(4);

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
      : Math.abs(parseFloat(b.nftPerpMarkToNfexIndex)) -
        Math.abs(parseFloat(a.nftPerpMarkToNfexIndex))
  );
}
