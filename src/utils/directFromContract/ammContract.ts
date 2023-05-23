import { type Address, getContract } from "viem";
import { publicClient } from "../viemClient";
import { AmmABI } from "~/constants/AmmAbi";

export const ammContract = ({ ammAddress }: { ammAddress: Address }) => {
  return getContract({
    address: ammAddress,
    abi: AmmABI,
    publicClient: publicClient,
  });
};
