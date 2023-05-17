"use server";

import { prisma } from "db";

export async function checkForLiquidatablePositions({
  amm,
  markPrice,
  side,
}: {
  amm: string;
  markPrice: number;
  side: string;
}) {
  if (!["BUY", "SELL"].includes(side)) console.log("WEIRD SIDE", side);

  const positions = await prisma.positionUpdatedEvent.findMany({
    where: {
      amm: amm,
      OR: [
        { liquidationPrice: { gt: markPrice }, side: "BUY" },
        { liquidationPrice: { lt: markPrice }, side: "SELL" },
      ],
    },
  });

  console.log("positions", positions[0]);

  if (positions.length === 0) return [];

  const liquidatablePositions = positions.map(({ amm, trader }) => ({
    amm,
    trader,
  }));

  return liquidatablePositions;
}
