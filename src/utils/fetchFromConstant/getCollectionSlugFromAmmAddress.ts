import { getAddress, isAddress } from "viem";
import { AMMData } from "~/constants/constants";

export function getCollectionSlugFromAmmAddress(address: string) {
  if (!isAddress(address)) {
    return undefined;
  }

  const ammData = AMMData.find(
    (data) => getAddress(data.nftPerpAmmAddress) === getAddress(address)
  );

  if (!ammData) {
    return undefined;
  }
  return ammData.collectionSlug;
}
