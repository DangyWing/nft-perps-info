import { NextResponse } from "next/server";
import { prisma } from "db";

export type LiquidatablePosition = {
  trader: string;
  amm: string;
  margin: string;
  entryPrice: string;
  leverage: string;
  maintenanceMargin: string;
  liquidationPrice: number;
  side: string;
};

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: {
      amm: string;
      //   markPrice: string;
    };
  }
) {
  const amm = params.amm;
  //   const markPriceClean = parseFloat(params.markPrice);

  const res = await prisma.positionUpdatedEvent.findMany({
    where: {
      amm: amm,
      liquidationPrice: {
        not: 0,
      },
      // OR: [
      //   { liquidationPrice: { gt: markPriceClean }, side: "BUY" },
      //   { liquidationPrice: { lt: markPriceClean }, side: "SELL" },
      // ],
    },
    select: {
      amm: true,
      trader: true,
      liquidationPrice: true,
      side: true,
      entryPrice: true,
      leverage: true,
      margin: true,
      maintenanceMargin: true,
    },
  });

  return NextResponse.json(res);
}
