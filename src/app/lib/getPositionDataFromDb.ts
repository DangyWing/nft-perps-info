import { prisma } from "../../../db";

export const getPositionDataFromDb = async () => {
  const res = await prisma.positionUpdatedEvent.findMany({
    orderBy: [{ timestamp: "desc" }, { liquidationPrice: "asc" }],
    take: 50,
    select: {
      ammName: true,
      amm: true,
      liquidationPrice: true,
      margin: true,
      leverage: true,
      markToLiq: true,
      unrealizedPnlAfter: true,
      lastUpdatedTimestamp: true,
      timestamp: true,
      entryPrice: true,
      isLiquidatable: true,
      markPrice: true,
      positionSizeAfter: true,
      size: true,
      maintenanceMargin: true,
      marginRatio: true,
      marginRatioToMinimumMarginRatio: true,
      trader: true,
      updatedAt: true,
      realizedPnl: true,
      unrealizedPnl: true,
      nftPerpId: true,
      side: true,
    },
    where: {
      size: {
        not: "0",
      },
      unrealizedPnl: {
        lte: 0,
      },
      timestamp: {
        gte: 1683047347,
      },
    },
    distinct: ["trader", "amm"],
  });

  console.log(res[0]?.unrealizedPnl.toString());

  return res.map((item) => ({
    ...item,
    marginRatio: parseFloat(item.marginRatio).toFixed(2),
    entryPrice: parseFloat(item.entryPrice).toFixed(2),
    markPrice: parseFloat(item.markPrice).toFixed(2),
    liquidationPrice: item.liquidationPrice.toFixed(2),
    leverage: parseFloat(item.leverage).toFixed(2),
    unrealizedPnl: parseFloat(item.unrealizedPnl.toString()),
    size: Math.abs(parseFloat(item.size)).toFixed(2),
  }));
};
