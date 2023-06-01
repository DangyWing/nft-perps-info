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

const dropdownListItemCSS =
  "hover:text-accent-foreground relative flex cursor-default select-none items-center bg-primary px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const buttonClasses =
  "w-full justify-start border-none p-0 m-0 rounded-none focus:bg-accent focus:text-accent-foreground";

export function RowActions({
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
          size="sm"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-primary p-0 text-primary-foreground"
      >
        {ammAddress && walletAddress && (
          <>
            <div className={dropdownListItemCSS}>
              <OpenPositionButton
                ammName={ammName}
                ammAddress={ammAddress}
                positionType={"long"}
                walletAddress={walletAddress}
                buttonVariant="none"
                buttonClasses={buttonClasses}
              />
            </div>
            <div className={dropdownListItemCSS}>
              <OpenPositionButton
                ammName={ammName}
                ammAddress={ammAddress}
                positionType={"short"}
                walletAddress={walletAddress}
                buttonVariant="none"
                buttonClasses={buttonClasses}
              />
            </div>
            {!!side && (
              <div>
                <DropdownMenuSeparator className="m-0 p-0" />
                <div className={dropdownListItemCSS}>
                  <ClosePositionButton
                    ammName={ammName}
                    ammAddress={ammAddress}
                    walletAddress={walletAddress}
                    side={side}
                    buttonVariant="none"
                    buttonClasses={buttonClasses}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
