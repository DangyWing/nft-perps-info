import { Suspense } from "react";
import { getPerpData } from "~/app/lib/getPerpData";
import { NewDataTable } from "~/components/perpDataTable/newDataTable";

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
        {/* @ts-expect-error Server Component */}
        <NewDataTable data={data} />
        {/* <DataTable columns={columns} data={data} /> */}
      </Suspense>
    </div>
  );
}
