import { AMMData } from "~/constants/constants";

export function getContractAddressFromAmmName(ammName: string) {
  const ammData = AMMData.find(
    (data) => data.ammName === ammName.toLowerCase()
  );
  if (!ammData) {
    throw new Error(`AMM ${ammName} not found`);
  }
  return ammData.nftPerpAmmAddress;
}
