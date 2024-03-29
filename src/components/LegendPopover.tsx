import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

export function LegendPopover() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="w-10 rounded-full p-0">
          <HelpCircle />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="background rounded-none border bg-primary/80 p-4"
        side="bottom"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-xl leading-none">wat mean?</h4>
            <ul className="space-y-1">
              <li className="flex items-center space-x-2">
                {/* todo: update to reflect actual heatmap/revamp legend to be meaningful */}
                <div className=" bg-zinc-100 px-1 text-zinc-800">
                  Funding on NftPerp AND Nfex AND Index To Mark
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <div className=" bg-purple-600 bg-opacity-20 px-1">
                  NftPerp funding rate
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <div className=" bg-green-600 bg-opacity-30 px-1">
                  Nfex funding rate
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <div className=" border-1 border border-zinc-800 bg-pink-400 bg-opacity-70 px-1">
                  NftPerp Index To Mark
                </div>
              </li>
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
