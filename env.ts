import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
    PUBLIC_NODE_ENV: z.enum(["development", "production"]),
  },
  client: {},
  runtimeEnv: process.env,
});
