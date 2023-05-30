import { type Address, getAddress } from "viem";
import { AMMData } from "../../constants/constants";

export function getNftPerpAmmNameFromContractAddress(address: Address) {
  const ammData = AMMData.find(
    (data) => getAddress(data.nftPerpAmmAddress) === getAddress(address)
  );
  if (!ammData) {
    throw new Error(`AMM for address: ${address} not found`);
  }
  return ammData.ammName;
}
