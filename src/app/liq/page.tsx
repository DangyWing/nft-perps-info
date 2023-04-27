import { Suspense } from "react";
import { getAllTraderLiqPrices } from "../lib/getAllTraderLiqPrices";
import { LiqDataTable } from "~/components/liqDataTable/liqDataTable";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export const metadata = {
  title: "NFTPerp Liq Info",
  description: "Shows you the potential liquidation prices for NFTPerps",
};

export default async function Page() {
  const liqPrices = await getAllTraderLiqPrices();

  return (
    <div>
      <div className="flex justify-center ">
        <Button variant="link" className="text-5xl">
          <Link href="/">
            <HomeIcon />
          </Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <LiqDataTable data={liqPrices} />
        </div>
      </Suspense>
    </div>
  );
}
