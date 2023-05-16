import { createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";

export const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(
    "https://arbitrum-mainnet.infura.io/v3/cedae0e5449f4711a498a87ba69b133e"
  ),
});
