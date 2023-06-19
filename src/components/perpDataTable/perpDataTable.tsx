"use client";

import { DataTable } from "./data-table";
import { columns } from "~/components/perpDataTable/columns";
import { useAccount } from "wagmi";
import { getAllPositionsForWallet } from "~/app/lib/directFromContract/getAllPositionsForWallet";
import { joinDataTogether } from "./joinDataTogether";
import { useQuery } from "@tanstack/react-query";
import { getPerpData } from "~/app/lib/getPerpData";
import { LoadingBlocks } from "~/components/Loading";


export function PerpDataTable() {
  const { address, isConnecting, isReconnecting } = useAccount();

  const isLoadingWallet = isConnecting || isReconnecting;

  const { data: walletPositions } = useQuery({
    queryKey: ["allPositionsForWallet", { address }],
    queryFn: () => getAllPositionsForWallet({ walletAddress: address }),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["getPerpData"],
    queryFn: () => getPerpData(),
  });

  if (isLoadingWallet) return <LoadingBlocks label="LOADING WALLET" />;
  if (isLoading) return <LoadingBlocks label="LOADING DATA" />;
  if (!!error) return <LoadingBlocks label="ERROR" />;
  if (!data) return <LoadingBlocks label="NO DATA ... YET" />;

  if (data instanceof Error) {
    return <div>Failed to fetch data</div>;
  }

  const combinedData = joinDataTogether(data, walletPositions);

  return (
    <div className="flex max-w-full items-center justify-center">
      <DataTable
        columns={columns}
        data={combinedData}
        connectedWalletAddress={address}
      />
    </div>
  );
}
