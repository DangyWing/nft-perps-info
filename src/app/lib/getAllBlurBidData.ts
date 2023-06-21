import { getBlurBidData } from "./getBlurBidData";
import { AMMData } from "~/constants/constants";

export async function getAllBlurBidData() {
  const allBlurBidData = await Promise.all(
    AMMData.map(async (amm) => {
      const res = await getBlurBidData({ collectionSlug: amm.collectionSlug });

      if (!(res instanceof Error)) {
        return res;
      }
    })
  );

  return allBlurBidData.filter(Boolean);
}
