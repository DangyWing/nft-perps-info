import { execute } from "~/../.graphclient";

export type TradersWithOpenPositionsRes = {
  data: TradersWithOpenPositionsData;
};

export type TradersWithOpenPositionsData = {
  ammPositions: TraderWithOpenPosition[];
};

export type TraderWithOpenPosition = {
  trader: `0x${string}`;
};
export async function getTradersWithOpenPositions() {
  const query = `
  query TradersWithOpenPositions {
    ammPositions(
      orderBy: unrealizedPnl
      orderDirection: asc
      first: 50
      where: {and: [{unrealizedPnl_lt: 0}, {margin_gt: 50000000000000000}]}
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
