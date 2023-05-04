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
  CellContext,
  Cell,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import type { PerpData } from "../../types";
import { PerpDataFilter } from "./PerpDataFilter";
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
        pageSize: 25,
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
        className: "bg-zinc-100 text-zinc-800 text-bold hover:text-zinc-800",
      };
    }
    if (targetNftPerpFundingRate) {
      return {
        className: "bg-purple-600 bg-opacity-20 hover:text-zinc-500",
      };
    }
    if (targetNfexFundingRate) {
      return {
        className: "bg-green-600 bg-opacity-30 hover:text-zinc-800",
      };
    }

    if (targetNftPerpIndexToMark) {
      return {
        // className: "bg-pink-400 bg-opacity-70 hover:text-zinc-800",
      };
    }
  };

  return (
    <div className="max-w-full">
      <LegendPopover />
      <table className="px-4">
        <thead className="text-xl uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className=" text-slate-800 dark:text-slate-200"
                  style={{
                    width:
                      header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
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
                        <div className="inline-flex">
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          <div>
                            {{
                              asc: <p className="mx-1">^</p>,
                              desc: <p className="mx-1 rotate-180">^</p>,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </div>
                      </div>
                      {header.column.getCanFilter() ? (
                        <div className="px-0">
                          <PerpDataFilter
                            column={header.column}
                            table={table}
                          />
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
              {/* todo: add left and right border if within header group */}
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    // className="border-b border-pink-300 border-opacity-30"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
