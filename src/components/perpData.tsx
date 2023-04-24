"use client";

import type { Datum } from "types";
import { calculate_percentage_change } from "~/utils/utils";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

type PerpData = {
  projectName: string;
  indexPrice: string;
  markPrice: string;
  fundingRate: string;
  indexToMark: number;
  source: string;
};

export function PerpData({ data }: { data: Datum[] }) {
  const columnHelper = createColumnHelper<PerpData>();

  const perpData: PerpData[] = data.map((row) => ({
    projectName: row.base_cfn,
    indexPrice: row.last_fund_rate_info.MomentBaseData.index_p,
    markPrice: row.last_fund_rate_info.MomentBaseData.market_p,
    fundingRate: row.last_fund_rate_info.current_period_fund_rate,
    indexToMark: calculate_percentage_change(
      parseFloat(row.last_fund_rate_info.MomentBaseData.index_p),
      parseFloat(row.last_fund_rate_info.MomentBaseData.market_p)
    ),
    source: "nfex",
  }));

  const defaultColumns = [
    columnHelper.accessor((row) => row.projectName, {
      id: "projectName",
      header: "Project Name",
      // cell: (info) => info.getValue(),
      cell: (info) => (
        <div className="text-left">
          <a
            href={`https://nfex.io/trade/${info.getValue()}`}
            target="_blank"
            rel="noreferrer"
          >
            {info.getValue()}
          </a>
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.indexPrice, {
      id: "indexPrice",
      header: "Index Price",
      cell: (info) => {
        return (
          <div className="text-right">
            {parseFloat(info.getValue())?.toFixed(4)}
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.markPrice, {
      id: "markPrice",
      header: "Mark Price",
      cell: (info) => {
        return (
          <div className="text-right">
            {parseFloat(info.getValue())?.toFixed(4)}
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.indexToMark, {
      id: "indexToMark",
      header: "Index To Mark (%)",
      cell: (info) => {
        return info.getValue().toFixed(2);
      },
    }),
    columnHelper.accessor((row) => row.fundingRate, {
      id: "fundingRate",
      header: "Funding Rate (%)",
      cell: (info) => {
        return (
          <div className="text-right">
            {(parseFloat(info.getValue()) * 100)?.toFixed(4)}
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.source, {
      id: "source",
      header: "Source",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: perpData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=" p-4">
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
