import { NextResponse } from "next/server";
import { prisma } from "db";
import { isAddress } from "viem";

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

function isFloat(value: unknown): value is number {
  if (typeof value === "string") {
    return !isNaN(parseFloat(value));
  }
  return false;
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: {
      amm: string;
      markPrice: string;
    };
  }
) {
  const amm = params.amm;

  if (!isAddress(amm)) {
    return NextResponse.json(new Error("Invalid AMM address"), { status: 400 });
  } else if (!isFloat(params.markPrice)) {
    return NextResponse.json(new Error("Invalid mark price"), { status: 400 });
  }

  const markPriceClean = parseFloat(params.markPrice);

  const res = await prisma.positionUpdatedEvent.findMany({
    where: {
      amm: amm,
      liquidationPrice: {
        not: 0,
      },
      OR: [
        { liquidationPrice: { gt: markPriceClean }, side: "BUY" },
        { liquidationPrice: { lt: markPriceClean }, side: "SELL" },
      ],
    },
    select: {
      amm: true,
      trader: true,
      liquidationPrice: true,
      side: true,
      entryPrice: true,
      leverage: true,
      margin: true,
    },
  });

  return NextResponse.json(res);
}
