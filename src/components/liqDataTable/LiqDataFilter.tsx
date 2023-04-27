import type { Column, Table } from "@tanstack/react-table";
import React from "react";
import type { LiqTableData } from "./columns";
import { DebouncedInput } from "../DebouncedInput";

export function LiqDataFilter({
  column,
  table,
}: {
  column: Column<LiqTableData, unknown>;
  table: Table<LiqTableData>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      !firstValue || parseFloat(firstValue.toString())
        ? []
        : Array.from<string>(column.getFacetedUniqueValues().keys()).sort(),
    [column, firstValue]
  );

  return firstValue === "number" ? (
    <div className="flex">
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0] ?? ""})`
            : ""
        }`}
        className="w-12 border shadow"
      />
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1] ?? ""})`
            : ""
        }`}
        className="w-12 border shadow"
      />
    </div>
  ) : (
    <>
      {["projectName", "side"].includes(column.id) && sortedUniqueValues && (
        <datalist id={column.id + "list"}>
          {sortedUniqueValues.splice(0, 1000).map((value: string) => (
            <option value={value} key={value} />
          ))}
        </datalist>
      )}
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        className="w-24 border border-zinc-700 bg-transparent outline-none"
        list={column.id + "list"}
      />
    </>
  );
}
