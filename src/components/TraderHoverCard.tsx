// add gravatar?
import type { Address } from "viem";
import { Button } from "../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { middleEllipsize } from "~/utils/middleEllipsize";

export function TraderHoverCard({ trader }: { trader: Address }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-md">
          {middleEllipsize(trader)}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="background w-full border border-zinc-700 bg-black">
        <h4 className=" text-sm font-semibold">{trader}</h4>
      </HoverCardContent>
    </HoverCard>
  );
}
