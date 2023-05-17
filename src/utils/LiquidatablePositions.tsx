"use server";

import { prisma } from "db";

// type LiquidatablePositionsProps = {
//   amm: string;
//   markPrice: number;
// };

export async function LiquidatablePositions({
  newTrade,
}: {
  newTrade: { amm: string; markPrice: string } | undefined;
}) {
  "use server";
  if (!newTrade) return <div>no liquidatable positions</div>;
  // if (!["BUY", "SELL"].includes(side)) console.log("WEIRD SIDE", side);
  const amm = newTrade.amm;
  const markPrice = parseFloat(newTrade.markPrice);

  const positions = await prisma.positionUpdatedEvent.findMany({
    where: {
      amm: amm,
      OR: [
        { liquidationPrice: { gt: markPrice }, side: "BUY" },
        { liquidationPrice: { lt: markPrice }, side: "SELL" },
      ],
    },
  });

  return positions.length === 0 ? (
    <div>no liquidatable positions</div>
  ) : (
    <div className="text-center text-xl">
      <div className="text-red-600">liquidatable positions</div>

      {positions.map((position, idx) => (
        <div key={idx}>
          <div key={position.amm.concat(idx.toString())}>
            amm: {position.amm}
          </div>
          <div key={position.trader.concat(idx.toString())}>
            trader: {position.trader}
          </div>
        </div>
      ))}
    </div>
  );
}
