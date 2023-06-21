"use client";

import { Input } from "~/components/ui/input";
import { getBlurBidData } from "./lib/getBlurBidData";
import { useState } from "react";

type BBD = {
  collectionSlug: string;
  highBid: string;
} | null;

export const TempFetchBlurBid = () => {
  const [collectionSlug, setCollectionSlug] = useState("");
  const [blurBidData, setBlurBidData] = useState<BBD>();

  async function clickHandler(collectionSlug: string) {
    console.log("CLICKED");
    const bbd = await getBlurBidData({ collectionSlug });
    console.log(bbd);
    if (!bbd) setBlurBidData(null);

    const highBid = bbd?.priceLevels.sort((a, b) => {
      return parseFloat(b.price) - parseFloat(a.price);
    })[0]?.price;

    setBlurBidData({
      collectionSlug: collectionSlug,
      highBid: highBid ?? "N/A",
    });
  }

  return (
    <div className="w-1/2">
      <h1>TempFetchBlurBid</h1>
      <Input onChange={(e) => setCollectionSlug(e.target.value)} />
      <button onClick={() => clickHandler(collectionSlug)}>Fetch</button>
      <div>{blurBidData?.collectionSlug}</div>
      <div>{blurBidData?.highBid}</div>
    </div>
  );
};
