import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
// import { AmmABI } from "~/constants/AmmAbi";
import { getContract } from "viem";
import { publicClient } from "../viemClient";
// import { type Amm } from "@nftperp/sdk/types";

export const clearingHouseContract = getContract({
  address: "0x6fc05b7dfe545cd488e9d47d56cfaca88f69a2e1",
  abi: ClearingHouseAbi,
  publicClient: publicClient,
});

// export const ammContract = ({ Amm }: Amm) => {
//   return getContract({
//     address: Amm.address,
//     abi: AmmABI,
//     publicClient: publicClient,
//   });
// };
