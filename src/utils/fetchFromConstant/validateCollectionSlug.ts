import { AMMData } from "~/constants/constants";

export function validateCollectionSlug(collectionSlug: string) {
  const ammData = AMMData.find(
    (data) => data.collectionSlug.toLowerCase() === collectionSlug.toLowerCase()
  );
  if (!ammData) {
    return Error(`AMM ${collectionSlug} not found`);
  }
  return ammData.collectionSlug;
}
