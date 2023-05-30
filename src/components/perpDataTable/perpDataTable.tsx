"use client";

import { DataTable } from "./data-table";
import { columns } from "~/components/perpDataTable/columns";
import { useAccount } from "wagmi";
import { getAllPositionsForWallet } from "~/app/lib/directFromContract/getAllPositionsForWallet";
import { joinDataTogether } from "./joinDataTogether";
import { useQuery } from "@tanstack/react-query";
import { getPerpData } from "~/app/lib/getPerpData";

export function PerpDataTable() {
  const { address, isConnecting, isReconnecting } = useAccount();

  const isLoadingWallet = isConnecting || isReconnecting;

  const { data: walletPositions } = useQuery({
    queryKey: ["allPositionsForWallet", { address }],
    queryFn: () => getAllPositionsForWallet({ walletAddress: address }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getPerpData"],
    queryFn: () => getPerpData(),
  });

  if (isLoadingWallet) return <div>Loading...(Wallet)</div>;

  if (isLoading) return <div>Data is Loading...</div>;
  if (!data) return <div>No Data ... yet?</div>;

  if (data instanceof Error) {
    return <div>Failed to fetch data</div>;
  }

  const combinedData = joinDataTogether(data, walletPositions);

  return (
    <DataTable
      columns={columns}
      data={combinedData}
      connectedWalletAddress={address}
    />
  );
}
