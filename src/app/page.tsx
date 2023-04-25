import { PerpData } from "../components/perpDataTable/perpDataTable";
import { Suspense } from "react";
import { getPerpData } from "./lib/getPerpData";

export const metadata = {
  title: "NFT Perps Info",
  description: "Shows you the data you need for NFT Perps",
};

export default async function Page() {
  const data = await getPerpData();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PerpData data={data} />
      </Suspense>
    </div>
  );
}
