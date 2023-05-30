"use client";

import { Trash } from "lucide-react";
import { type Address } from "viem";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ClosePositionForm } from "./ClosePositionForm";
import { Suspense } from "react";

export function ClosePositionButton({
  ammName,
  ammAddress,
  walletAddress,
  side,
}: {
  ammName: string;
  ammAddress: Address;
  walletAddress: Address;
  side: "long" | "short";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start border-none p-0"
        >
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          <span>Close</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Suspense fallback={<div>Loading...</div>}>
          <ClosePositionForm
            ammAddress={ammAddress}
            ammName={ammName}
            walletAddress={walletAddress}
            side={side}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
}
