"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { env } from "env";
import { arbitrum } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig(
  getDefaultConfig({
    alchemyId: env.PUBLIC_INFURA_ID,
    walletConnectProjectId: env.PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: "NFT Perps Info",
    appDescription: "NFT Perps Info",
    appUrl: "https://nft-perps-info.vercel.app/",
    chains: [arbitrum],
  })
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
