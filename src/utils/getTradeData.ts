import type { TradeDataResponse } from "../types";

export const getTradeData = async (txHash: `0x${string}`) => {
  const url = `https://api3.nftperp.xyz/stats/trades?hash=${txHash}`;
  try {
    const res = await fetch(url, {
      next: {
        revalidate: 300,
      },
    });
    const { data } = (await res.json()) as TradeDataResponse;

    return data.result[0];
  } catch (error) {
    console.log("There was an error", error);
  }
};

// subscribe to get new positions or position changes
// get liquidation price for each position on create or change
// if liquidation price is less than current price, alert
