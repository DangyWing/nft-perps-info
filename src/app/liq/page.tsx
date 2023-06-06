import { LiqDataTable } from "~/components/liqDataTable/liqDataTable";
import { getPositionDataFromDb } from "../lib/getPositionDataFromDb";

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

      <LiqDataTable data={positionData} />
    </div>
  );
}
