"use client";

import { DataTable } from "./data-table";
import { columns } from "~/components/perpDataTable/columns";
import { type PerpData } from "~/types";
import { useAccount } from "wagmi";
import { getAllPositionsForWallet } from "~/utils/directFromContract/getAllPositionsForWallet";
import { joinDataTogether } from "./joinDataTogether";
// import { cache } from "react";

export async function NewDataTable({ data }: { data: PerpData[] }) {
  const { address } = useAccount();

  const walletPositions = await getAllPositionsForWallet({
    walletAddress: address,
  });

  const combinedData = joinDataTogether(data, walletPositions);

  return <DataTable columns={columns} data={combinedData} />;
}
