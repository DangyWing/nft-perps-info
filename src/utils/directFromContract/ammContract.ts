import { type Address, getContract } from "viem";
import { publicClient } from "../viemClient";
import { AmmABI } from "~/constants/AmmAbi";
// bayc 0x604Ed62F5991d6a2C47b13B9E5d34cC1C5048e99

export const ammContract = ({ ammAddress }: { ammAddress: Address }) => {
  return getContract({
    address: ammAddress,
    abi: AmmABI,
    publicClient: publicClient,
  });
};
