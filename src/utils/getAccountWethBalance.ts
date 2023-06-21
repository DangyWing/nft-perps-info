import { formatEther, type Address } from "viem";
import { publicClient } from "./viemClient";
import { erc20ABI } from "wagmi";

const WETH_CONTRACT = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";

export async function getAccountWethBalance({ address }: { address: Address }) {

  const balance = await publicClient.readContract({
    address: WETH_CONTRACT,
    abi: erc20ABI,
    args: [address],
    functionName: "balanceOf",
  });

  return parseFloat(formatEther(balance));
}
