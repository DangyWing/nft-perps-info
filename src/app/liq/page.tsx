import { Suspense } from "react";
import { getAllTraderLiqPrices } from "../lib/getAllTraderLiqPrices";
import { LiqDataTable } from "~/components/liqDataTable/liqDataTable";

// export const metadata = {
//   title: "NFT Perps Info",
//   description: "Shows you the data you need for NFT Perps",
// };

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
