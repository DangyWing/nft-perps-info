"use client";

import { Trash } from "lucide-react";
import { type Address } from "viem";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ClosePositionForm } from "./ClosePositionForm";

export function ClosePositionButton({
  ammName,
  ammAddress,
  walletAddress,
  side,
  buttonVariant,
  buttonClasses,
}: {
  ammName: string;
  ammAddress: Address;
  walletAddress: Address;
  side: "long" | "short";
  buttonVariant: ButtonProps["variant"];
  buttonClasses?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={buttonVariant} className={buttonClasses}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          <span>Close</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-primary text-primary-foreground">
        <ClosePositionForm
          ammAddress={ammAddress}
          ammName={ammName}
          walletAddress={walletAddress}
          side={side}
        />
      </PopoverContent>
    </Popover>
  );
}
