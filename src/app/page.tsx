import { PerpDataTable } from "../components/perpDataTable/perpDataTable";
import { Suspense } from "react";
import { getPerpData } from "./lib/getPerpData";

export const metadata = {
  title: "NFT Perps Info",
  description: "Shows you the data you need for NFT Perps",
};

export default async function Page() {
  const data = await getPerpData();

  if (data instanceof Error) {
    return <div>Failed to fetch data</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PerpDataTable data={data} />
      </Suspense>
    </div>
  );
}
