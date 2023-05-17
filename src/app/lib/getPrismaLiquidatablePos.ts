// "use server";
import { prisma } from "db";

// Get all liquidatable positions
export async function getPrismaLiquidatablePos({
  amm,
  markPrice,
}: {
  amm: string;
  markPrice: string;
}) {
  const markPriceClean = parseFloat(markPrice);

  return await prisma.positionUpdatedEvent.findMany({
    where: {
      amm: amm,
      //   OR: [
      // { liquidationPrice: { gt: markPriceClean }, side: "BUY" },
      // { liquidationPrice: { lt: markPriceClean }, side: "SELL" },
      //   ],
    },
  });
}
