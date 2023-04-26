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

import { Filter } from "../Filter";

export function PerpDataTable({ data }: { data: PerpData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    // defaultColumn: {
    //   minSize: 0,
    //   size: 0,
    // },
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

  return (
    <div className="max-w-6xl p-2">
      <table className="divide-y divide-gray-200">
        <thead className="border-b border-slate-200 text-xl uppercase dark:border-slate-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-2 py-2 text-slate-800 dark:text-slate-200"
                  style={{
                    width:
                      header.getSize() !== 0 ? header.getSize() : undefined,
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
        <tbody className="p-4">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-12"
                  style={{
                    width:
                      cell.column.getSize() !== 0
                        ? cell.column.getSize()
                        : undefined,
                  }}
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
