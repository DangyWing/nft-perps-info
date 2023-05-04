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
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import type { PerpData } from "../../types";
import { PerpDataFilter } from "./PerpDataFilter";
import { LegendPopover } from "../LegendPopover";
import { getBackgroundColorScales } from "~/utils/getBackgroundColorScales";

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

  return (
    <div className="justify-center p-2">
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
            <tr
              key={row.id}
              className="border-b border-pink-300 border-opacity-30"
            >
              {/* todo: add left and right border if within header group */}
              {row.getVisibleCells().map((cell) => {
                const newClass = getBackgroundColorScales({
                  cellValue: cell.getValue(),
                  columnId: cell.column.id,
                });

                return (
                  <td key={cell.id} className={newClass}>
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
