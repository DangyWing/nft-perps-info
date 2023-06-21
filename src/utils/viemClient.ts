import { createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";
import { env } from "~/env.mjs";

export const publicClient = createPublicClient({
  chain: arbitrum,
  batch: {
    multicall: {
      batchSize: 1_024,
      wait: 0,
    },
  },
  pollingInterval: 4_000,
  transport: http(env.NEXT_PUBLIC_INFURA_RPC_URL),
});
