"use client";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [arbitrum],
  // [infuraProvider({ apiKey: "cedae0e5449f4711a498a87ba69b133e" })]
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "nft perps info",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/* <RainbowKitProvider modalSize="wide" chains={chains}> */}
      {children}
      {/* </RainbowKitProvider> */}
    </WagmiConfig>
  );
}
