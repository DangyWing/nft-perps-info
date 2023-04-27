import { execute } from "../../.graphclient";

export type TradersWithOpenPositionsRes = {
  data: TradersWithOpenPositionsData;
};

export type TradersWithOpenPositionsData = {
  ammPositions: TraderWithOpenPosition[];
};

export type TraderWithOpenPosition = {
  trader: `0x${string}`;
};
//todo: change first to 1000 to get all traders
export async function getTradersWithOpenPositions() {
  const query = `
  query TradersWithOpenPositions {
    ammPositions(
      orderBy: unrealizedPnl
      orderDirection: asc
      first: 1000
      where: {and: [{unrealizedPnl_lt: 0}, {margin_gt: 10000000000000000}]}
    ) {
      trader
    }
  }
`;
  const res = (await execute(query, {})) as TradersWithOpenPositionsRes;

  const traderSet = new Set<`0x${string}`>();
  for (const { trader } of res.data.ammPositions) {
    traderSet.add(trader);
  }

  return traderSet;
}

// subscribe to get new positions or position changes
// get liquidation price for each position on create or change
// if liquidation price is less than current price, alert
