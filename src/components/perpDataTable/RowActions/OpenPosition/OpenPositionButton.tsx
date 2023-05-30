"use client";

import { Rocket, TrendingDown } from "lucide-react";
import { type Address } from "viem";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { OpenPositionForm } from "./OpenPositionForm";

export function OpenPositionButton({
  ammName,
  ammAddress,
  positionType,
}: {
  ammName: string;
  ammAddress: Address;
  positionType: "long" | "short";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start border-none p-0"
        >
          {positionType === "long" ? (
            <Rocket className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          ) : (
            <TrendingDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          )}
          <span className="">{positionType.toLowerCase()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <OpenPositionForm
          ammAddress={ammAddress}
          ammName={ammName}
          positionType={positionType}
        />
      </PopoverContent>
    </Popover>
  );
}