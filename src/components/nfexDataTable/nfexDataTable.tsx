"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useAccount } from "wagmi";

import { useQuery } from "@tanstack/react-query";

import { LoadingBlocks } from "~/components/Loading";
import { getNfexPerpData } from "~/app/lib/nfexDataFetching/getNfexPerpData";

export function NfexDataTable() {
  const { address, isConnecting, isReconnecting } = useAccount();

  const isLoadingWallet = isConnecting || isReconnecting;

  const { data } = useQuery({
    queryKey: ["getPerpData"],
    queryFn: () => getNfexPerpData(),
  });

  if (isLoadingWallet) return <LoadingBlocks label="LOADING WALLET" />;
  if (!data) return <LoadingBlocks label="NO DATA ... YET" />;

  return (
    <div className="flex max-w-full items-center justify-center">
      <DataTable
        columns={columns}
        data={data}
        connectedWalletAddress={address}
      />
    </div>
  );
}
