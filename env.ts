import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
    PUBLIC_NODE_ENV: z.enum(["development", "production"]),
    PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
    PUBLIC_INFURA_ID: z.string(),
    PUBLIC_INFURA_RPC_URL: z.string().url(),
    PUBLIC_ALCHEMY_RPC_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: process.env,
});
