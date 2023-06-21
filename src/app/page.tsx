import { PerpDataTable } from "~/components/perpDataTable/perpDataTable";
import { getAllBlurBidData } from "./lib/getAllBlurBidData";

export default async function Page() {
  const blurBidData = await getAllBlurBidData();

  return (
    <div>
      <PerpDataTable blurBidData={blurBidData} />
    </div>
  );
}
