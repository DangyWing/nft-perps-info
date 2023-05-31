import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { OpenPositionButton } from "~/components/perpDataTable/RowActions/OpenPosition/OpenPositionButton";
import { type Address } from "viem";
import { ClosePositionButton } from "./ClosePosition/ClosePositionButton";

export function DataTableRowActions({
  ammName,
  ammAddress,
  walletAddress,
  side,
}: {
  ammName: string;
  ammAddress: Address | undefined;
  walletAddress: Address | undefined;
  side: "long" | "short" | undefined;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {ammAddress && walletAddress && (
          <>
            <div
              className={
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              }
            >
              <OpenPositionButton
                ammName={ammName}
                ammAddress={ammAddress}
                positionType={"long"}
                walletAddress={walletAddress}
              />
            </div>
            <div
              className={
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              }
            >
              <OpenPositionButton
                ammName={ammName}
                ammAddress={ammAddress}
                positionType={"short"}
                walletAddress={walletAddress}
              />
            </div>
            <DropdownMenuSeparator />
            {!!side && (
              <div
                className={
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                }
              >
                <ClosePositionButton
                  ammName={ammName}
                  ammAddress={ammAddress}
                  walletAddress={walletAddress}
                  side={side}
                />
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
