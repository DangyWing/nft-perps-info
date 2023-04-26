"use client";

import {
  type SortingState,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
  type Row,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import type { PerpData } from "../../types";
import { Filter } from "../Filter";
import { LegendPopover } from "../LegendPopover";

export function PerpDataTable({ data }: { data: PerpData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    enableColumnFilters: true,
    enableFilters: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    initialState: {
      grouping: ["projectName"],
      pagination: {
        pageSize: 50,
      },
    },
  });

  const getRowProps = (row: Row<PerpData>) => {
    const nfexFundingRate = parseFloat(row.getValue<string>("fundingRate"));
    const nftPerpFundingRate = parseFloat(
      row.getValue<string>("nftPerpFundingRate")
    );
    const targetNftPerpFundingRate = nftPerpFundingRate > 0.03;
    const targetNfexFundingRate = nfexFundingRate > 0.03;
    const targetNftPerpIndexToMark =
      parseFloat(row.getValue<string>("nftPerpIndexToMark")) > 0.25;

    if (
      targetNftPerpFundingRate &&
      targetNfexFundingRate &&
      targetNftPerpIndexToMark
    ) {
      return {
        className: "bg-zinc-100 px-1 text-zinc-800 text-bold",
      };
    }
    if (targetNftPerpFundingRate) {
      return {
        className: "bg-purple-600 bg-opacity-20",
      };
    }
    if (targetNfexFundingRate) {
      return {
        className: "bg-green-600 bg-opacity-30",
      };
    }

    if (targetNftPerpIndexToMark) {
      return {
        className: "bg-pink-400 bg-opacity-70 border border-zinc-800 border-1",
      };
    }
  };

  // Func to provide props to table cell
  // const getCellProps = (context: CellContext<PerpData, unknown>) => {
  //   const value = context.getValue();

  //   if (context.row.index === 0) {
  //     return {
  //       className: "bg-pink-700 bg-opacity-40",
  //     };
  //   }
  // };

  return (
    <div className="max-w-6xl p-2">
      <LegendPopover />
      <table className="divide-y divide-gray-200">
        <thead className="border-b border-slate-200 text-xl uppercase dark:border-slate-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-2 py-2 text-slate-800 dark:text-slate-200"
                >
                  {header.isPlaceholder ? null : (
                    <>
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
                      {header.column.getCanFilter() ? (
                        <div className="px-0">
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="p-2">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} {...getRowProps(row)}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2"
                  // {...getCellProps(cell.getContext())}
                >
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
