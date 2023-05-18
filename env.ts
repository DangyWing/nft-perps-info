import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
    PUBLIC_NODE_ENV: z.enum(["development", "production"]),
    PUBLIC_PROJECT_ID: z.string(),
    // PUBLIC_ENVIRONMENT_ID: z.string(),
  },
  client: {
    PUBLIC_ENVIRONMENT_ID: z.string(),
    // PUBLIC_PROJECT_ID: z.string(),
  },
  runtimeEnv: process.env,
});
