import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

export function LegendPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-10 rounded-full p-0">
          <HelpCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="background w-96 rounded-none border-zinc-500 bg-zinc-900 bg-opacity-100">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-xl leading-none">wat mean?</h4>

            <ul className="space-y-1">
              <li className="flex items-center space-x-2">
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
      </PopoverContent>
    </Popover>
  );
}
