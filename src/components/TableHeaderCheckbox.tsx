import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { type PerpData } from "~/types";
import { type Column } from "@tanstack/react-table";

function handleFilterChange({
  value,
  column,
}: {
  value: string;
  column: Column<PerpData>;
}) {
  const currFilter = column.getFilterValue() as string[] | undefined;

  if (value == "all") {
    column.setFilterValue(undefined);
    return;
  } else if (currFilter && currFilter.includes(value)) {
    column.setFilterValue(currFilter.filter((v) => v !== value));
  } else {
    column.setFilterValue([...(currFilter || []), value]);
  }
}

export function TableHeaderCheckbox({
  values,
  column,
}: {
  values: string[];
  column: Column<PerpData, unknown>;
}) {
  const currFilter = column.getFilterValue() as string[] | undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:background hover:bg-zinc-8 rounded-none border border-zinc-400 hover:bg-zinc-800"
        >
          filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="background w-56 bg-black">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {values.map((value) => (
            <DropdownMenuItem
              key={value}
              className={
                currFilter && currFilter.includes(value)
                  ? "background bg-zinc-800 text-green-300"
                  : "hover:background text-white hover:bg-zinc-800"
              }
              onSelect={() =>
                handleFilterChange({
                  value,
                  column,
                })
              }
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
