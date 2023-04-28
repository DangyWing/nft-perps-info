import { Suspense } from "react";
import { getAllTraderLiqPrices } from "../lib/getAllTraderLiqPrices";
import { LiqDataTable } from "~/components/liqDataTable/liqDataTable";

export const metadata = {
  title: "NFTPerp Liq Info",
  description: "Shows you the potential liquidation prices for NFTPerps",
};

export default async function Page() {
  const liqPrices = await getAllTraderLiqPrices();

  return (
    <div>
      <h1 className="flex justify-end text-xl text-red-500">
        DEAR GOD DO NOT CLICK THE LIQ BUTTON I DO NOT KNOW WHAT IT WILL DO EVEN
        THOUGH I MADE IT
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <LiqDataTable data={liqPrices} />
        </div>
      </Suspense>
    </div>
  );
}
