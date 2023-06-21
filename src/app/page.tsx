import { PerpDataTable } from "~/components/perpDataTable/perpDataTable";
// import { getAllBlurBidData } from "./lib/getAllBlurBidData";

// export default async function Page() {
export default function Page() {
  // const blurBidData = await getAllBlurBidData();

  const blurBidData = [
    {
      collectionSlug: "boredapeyachtclub",
      success: true,
      priceLevels: [
        {
          price: "66.66",
          executableSize: 2,
          numberBidders: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <PerpDataTable blurBidData={blurBidData} />
    </div>
  );
}
