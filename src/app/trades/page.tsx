import { TradesDataTable } from "~/components/nftPerpTradesDataTable/tradesDataTable";

export const metadata = {
  title: "NFTPerp trades",
  description: "Shows you current trades",
};

export default function Page() {
  return (
    <div>
      <TradesDataTable />
    </div>
  );
}
