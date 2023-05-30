import { type getAllPositionsForWallet } from "~/app/lib/directFromContract/getAllPositionsForWallet";
import { cn } from "../utils/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

// todo: get AMMs without results and stil get their data so a user can open a position if required
type AdditionalProps = {
  ammData: Awaited<ReturnType<typeof getAllPositionsForWallet>>[0];
};

type CardProps = React.ComponentProps<typeof Card> & AdditionalProps;

export function PositionCard({ className, ammData, ...props }: CardProps) {
  return (
    <div>
      {!ammData?.unrealizedPnl || !ammData.ammName ? (
        <span>NO DATA</span>
      ) : (
        <Card className={cn("w-[380px]", className)} {...props}>
          <CardHeader>
            <CardTitle>{ammData.ammName}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div>
              {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
              <div className="flex">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    margin: {ammData.margin}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    marginRatio: {ammData.marginRatio}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    uPnl: {ammData.unrealizedPnl}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    open Notional: {ammData.openNotional}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    position Notional: {ammData.positionNotional}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div>will be buttons to close open etc.</div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
