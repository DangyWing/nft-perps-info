"use client";

import { VT323 } from "next/font/google";
import "../styles/globals.css";
import { cn } from "~/utils/utils";
import { SiteHeader } from "~/components/SiteHeader";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

const fontMono = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "5a9f5d89-eac8-4252-949d-790a79f7536b",
        }}
      >
        <DynamicWagmiConnector
          evmNetworks={[
            {
              blockExplorerUrls: ["https://arbiscan.io/"],
              chainId: 42161,
              chainName: "Arbitrum",
              iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
              nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
              networkId: 42161,
              privateCustomerRpcUrls: [
                "https://arbitrum-mainnet.infura.io/v3/cedae0e5449f4711a498a87ba69b133e",
              ],
              rpcUrls: ["https://arb1.arbitrum.io/rpc"],
              vanityName: "Arbitrum",
            },
          ]}
        >
          {/* <DynamicWidget /> */}
          <body
            className={cn(
              "flex flex-col items-center justify-center bg-zinc-900 align-middle text-lg text-zinc-200",
              fontMono.className
            )}
          >
            <SiteHeader />
            {children}
          </body>
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </html>
  );
}
