import { validateCollectionSlug } from "~/utils/fetchFromConstant/validateCollectionSlug";
import type { BlurBidData } from "~/types";
// import { env } from "~/env.mjs";
import axios from "axios";

export async function getBlurBidData({
  collectionSlug,
}: {
  collectionSlug: string;
}) {
  if (validateCollectionSlug(collectionSlug) instanceof Error) {
    console.log(`AMM ${collectionSlug} not found`);
    return null;
  }

  // const url = `https://core-api.prod.blur.io/v1/collections/${collectionSlug}/executable-bids`;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://core-api.prod.blur.io/v1/collections/boredapeyachtclub/executable-bids",
    headers: {
      "User-Agent": "PostmanRuntime/7.32.3",
      Host: "core-api.prod.blur.io",
      Cookie:
        "__cf_bm=IhVuz2KcxU2KQ6G6UiGlA3h0dfnWQfyEPuxJOBYcOJ8-1687356769-0-AQjRBzj/sgwnf3tVZHg9UwjipVm0UodvXbLdnETx8SjzEk0PWM8LqySUI4ucuuXo7oMpafRzpwH0Y12GTmeDFRU=",
    },
  };

  try {
    const res = await axios.request(config);

    const bidData = res.data as BlurBidData;

    // const res = await fetch(url, {
    //   method: "GET",
    //   next: {
    //     revalidate: 10_000,
    //   },
    //   headers: {
    //     "User-Agent": "PostmanRuntime/7.32.3",
    //     // Cookie: env.NEXT_PUBLIC_BLUR_COOKIE,
    //     // Accept: "*/*",
    //     // "Accept-Encoding": "gzip, deflate, br",
    //     // Connection: "keep-alive",
    //     // "Content-Type": "application/json",
    //     // Host: "core-api.prod.blur.io",
    //     Cookie:
    //       "__cf_bm=IhVuz2KcxU2KQ6G6UiGlA3h0dfnWQfyEPuxJOBYcOJ8-1687356769-0-AQjRBzj/sgwnf3tVZHg9UwjipVm0UodvXbLdnETx8SjzEk0PWM8LqySUI4ucuuXo7oMpafRzpwH0Y12GTmeDFRU=",
    //   },
    // });

    // const bidData = (await res.json()) as BlurBidData;

    return { ...bidData, collectionSlug };
  } catch (error) {
    console.log(error);
  }
}
