"use client";

import { VT323 } from "next/font/google";
import "../styles/globals.css";
import { cn } from "~/utils/utils";

import { WagmiConfig, createClient } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultClient,
  // ConnectKitButton,
  // getDefaultClient,
} from "connectkit";
import { SiteHeader } from "~/components/SiteHeader";
import { arbitrum } from "wagmi/chains";

const chains = [arbitrum];

const client = createClient(
  getDefaultClient({
    appName: "nftPerpData",
    chains,
  })
);

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
      <WagmiConfig client={client}>
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
