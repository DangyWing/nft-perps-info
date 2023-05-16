"use client";

import { VT323 } from "next/font/google";
import "../styles/globals.css";
import { cn } from "~/utils/utils";

import {
  ConnectKitProvider,
  // getDefaultClient,
  // ConnectKitButton,
  // getDefaultClient,
} from "connectkit";
import { SiteHeader } from "~/components/SiteHeader";
import { arbitrum } from "wagmi/chains";

import { configureChains } from "@wagmi/core";
import { createConfig, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";

const { publicClient } = configureChains(
  [arbitrum, mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
});

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
      <WagmiConfig config={config}>
        <ConnectKitProvider
          options={{
            truncateLongENSAddress: true,
            initialChainId: 42161,
          }}
        >
          <body
            className={cn(
              "flex flex-col items-center justify-center bg-zinc-900 align-middle text-lg text-zinc-200",
              fontMono.className
            )}
          >
            <SiteHeader />
            {children}
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
