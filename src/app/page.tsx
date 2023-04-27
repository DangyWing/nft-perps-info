import { PerpDataTable } from "../components/perpDataTable/perpDataTable";
import { Suspense } from "react";
import { getPerpData } from "./lib/getPerpData";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const metadata = {
  title: "NFT Perps Info",
  description: "Shows you the data you need for NFT Perps",
};

export default async function Page() {
  const data = await getPerpData();

  return (
    <div>
      <div className="flex justify-center ">
        <Button variant="link" className="text-5xl">
          <Link href="/liq">👅</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PerpDataTable data={data} />
      </Suspense>
    </div>
  );
}
