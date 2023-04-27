import { Suspense } from "react";
import { getAllTraderLiqPrices } from "../lib/getAllTraderLiqPrices";
import { LiqDataTable } from "~/components/liqDataTable/liqDataTable";

export const metadata = {
  title: "NFTPerp Liq Info",
  description: "Shows you the potential liquidation prices for NFTPerps",
};

export default async function Page() {
  const liqPrices = (await getAllTraderLiqPrices()).sort((a, b) => {
    return parseFloat(a.marginRatio) - parseFloat(b.marginRatio);
  });

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <LiqDataTable data={liqPrices} />
        </div>
      </Suspense>
    </div>
  );
}
