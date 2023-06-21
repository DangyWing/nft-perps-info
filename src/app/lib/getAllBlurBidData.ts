import { getBlurBidData } from "./getBlurBidData";
// import { AMMData } from "~/constants/constants";

export async function getAllBlurBidData() {
  // const allBlurBidData = await Promise.all(
  //   AMMData.map(async (amm) => {
  //     const res = await getBlurBidData({ collectionSlug: amm.collectionSlug });

  //     if (!(res instanceof Error)) {
  //       return res;
  //     }
  //   })
  // );

  const allBlurBidData = [
    await getBlurBidData({
      collectionSlug: "boredapeyachtclub",
    }),
  ];

  return allBlurBidData.filter(Boolean);
}
