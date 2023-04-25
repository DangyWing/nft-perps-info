"use client";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";

export type PerpData = {
  projectName: string;
  indexPrice: string;
  markPrice: string;
  fundingRate: string;
  indexToMark: number;
  nftPerpIndexPrice?: string;
  nftPerpMarkPrice?: string;
  nftPerpFundingRate?: string;
  nftPerpIndexToMark?: number;
  source: string;
};
export type NfexPerpData = {
  projectName: string;
  indexPrice: string;
  markPrice: string;
  fundingRate: string;
  indexToMark: number;
  source: string;
};

export type NftPerpData = {
  projectName: string;
  nftPerpIndexPrice: string;
  nftPerpMarkPrice: string;
  nftPerpFundingRate: string;
  nftPerpIndexToMark: number;
  source: string;
};

export function PerpData({ data }: { data: PerpData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      grouping: ["projectName"],
      pagination: {
        pageSize: 50,
      },
    },
  });

  return (
    <div className="p-2">
      <table className="divide-y divide-gray-200">
        <thead className="border-b border-slate-200 text-xl uppercase dark:border-slate-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-4 py-3 text-slate-800 dark:text-slate-200"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "inline-flex min-w-max cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div className="inline-flex space-x-2">
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        <div>
                          {{
                            asc: "^",
                            desc: <p className="rotate-180">^</p>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="p-4">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-12">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
