import { LiqDataTable } from "~/components/liqDataTable/liqDataTable";
import { getPositionDataFromDb } from "../lib/getPositionDataFromDb";
import { Suspense } from "react";

export const metadata = {
  title: "NFTPerp Liq Info",
  description: "Shows you the potential liquidation prices for NFTPerps",
};

export default async function Page() {
  const positionData = await getPositionDataFromDb();

  return (
    <div>
      <h1 className="flex justify-end text-xl text-red-500">
        DEAR GOD DO NOT CLICK THE LIQ BUTTON I DO NOT KNOW WHAT IT WILL DO EVEN
        THOUGH I MADE IT
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <LiqDataTable data={positionData} />
      </Suspense>
    </div>
  );
}
