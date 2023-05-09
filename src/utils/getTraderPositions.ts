import { cache } from "react";
import type { TraderPositionResponse } from "../types";

export const getTraderPositions = cache(async (trader: `0x${string}`) => {
  const url = `https://api3.nftperp.xyz/positions?trader=${trader}`;
  try {
    const res = await fetch(url, {
      next: {
        revalidate: 300,
      },
    });
    const { data } = (await res.json()) as TraderPositionResponse;

    return Object.entries(data).map(([, value]) => {
      return value;
    });
  } catch (error) {
    console.log("There was an error", error);
  }
});

// subscribe to get new positions or position changes
// get liquidation price for each position on create or change
// if liquidation price is less than current price, alert
