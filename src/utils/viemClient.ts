import { createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";
import { env } from "env";

const { PUBLIC_INFURA_RPC_URL } = env;

export const publicClient = createPublicClient({
  chain: arbitrum,
  batch: {
    multicall: {
      batchSize: 1_024,
      wait: 0,
    },
  },
  pollingInterval: 4_000,
  transport: http(PUBLIC_INFURA_RPC_URL),
});
