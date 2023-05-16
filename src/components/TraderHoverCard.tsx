import { Button } from "../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { middleEllipsize } from "~/utils/middleEllipsize";

export function TraderHoverCard({ trader }: { trader: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-md">
          <a
            href={`https://nft.perpanalytics.xyz/?address=${trader}`}
            target="_blank"
          >
            {middleEllipsize(trader)}
          </a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="background w-full border border-zinc-700 bg-black">
        <h4 className=" text-sm font-semibold">{trader}</h4>
      </HoverCardContent>
    </HoverCard>
  );
}
