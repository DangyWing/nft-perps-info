import type { Column, Table } from "@tanstack/react-table";
import React from "react";
import type { PerpData } from "~/types";
import { PerpTableHeaderFilterDropdown } from "./PerpTableHeaderFilterDropdown";

export function PerpDataFilter({
  column,
}: {
  column: Column<PerpData, unknown>;
  table: Table<PerpData>;
}) {
  const sortedUniqueValues = React.useMemo(
    () => Array.from<string>(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <>
      {column.id === "projectName" && sortedUniqueValues && (
        <div className="p-2">
          <PerpTableHeaderFilterDropdown
            values={["all", ...sortedUniqueValues]}
            column={column}
          />
        </div>
      )}
    </>
  );
}
