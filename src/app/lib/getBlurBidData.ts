import { validateCollectionSlug } from "~/utils/fetchFromConstant/validateCollectionSlug";
import type { BlurBidData } from "~/types";
import { env } from "env";

export async function getBlurBidData({
  collectionSlug,
}: {
  collectionSlug: string;
}) {
  if (validateCollectionSlug(collectionSlug) instanceof Error) {
    console.log(`AMM ${collectionSlug} not found`);
    return null;
  }

  const url = `https://core-api.prod.blur.io/v1/collections/${collectionSlug}/executable-bids`;

  const res = await fetch(url, {
    method: "GET",
    next: {
      revalidate: 10_000,
    },
    headers: {
      "User-Agent": "PostmanRuntime/7.32.3",
      Cookie: env.BLUR_COOKIE,
    },
  });

  const bidData = (await res.json()) as BlurBidData;

  return { ...bidData, collectionSlug };
}
