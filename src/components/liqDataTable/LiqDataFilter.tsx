import type { Column } from "@tanstack/react-table";
import React from "react";
import type { LiqTableData } from "./columns";
// import { DebouncedInput } from "../DebouncedInput";
import { LiqTableHeaderFilterDropdown } from "./LiqTableHeaderFilterDropdown";

export function LiqDataFilter({
  column,
}: {
  column: Column<LiqTableData, unknown>;
}) {
  const sortedUniqueValues = React.useMemo(
    () => Array.from<string>(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <>
      {column.id === "projectName" && sortedUniqueValues && (
        <div className="p-2">
          <LiqTableHeaderFilterDropdown
            values={["all", ...sortedUniqueValues]}
            column={column}
          />
        </div>
      )}
    </>
  );
}
