"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
            // privateCustomerRpcUrls: ["https://mainnet.infura.io/v3/xxxx"],
            rpcUrls: ["https://arb1.arbitrum.io/rpc"],
            vanityName: "Arbitrum",
          },
        ]}
      >
        {children}
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
}
