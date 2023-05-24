import { Suspense } from "react";
import { DataTable } from "~/components/perpDataTable/data-table";
import { columns } from "~/components/perpDataTable/columns";
import { getPerpData } from "~/app/lib/getPerpData";

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
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
