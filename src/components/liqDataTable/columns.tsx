"use client";

import { createColumnHelper } from "@tanstack/react-table";
// import { type getAllTraderLiqPrices } from "~/app/lib/getAllTraderLiqPrices";
import { type getPositionDataFromDb } from "~/app/lib/getPositionDataFromDb";
import { TraderHoverCard } from "../TraderHoverCard";
import { LiqButton } from "../liqAction/liqButton";

// export type LiqTableData = Awaited<ReturnType<typeof getAllTraderLiqPrices>>[0];
export type LiqTableData = Awaited<ReturnType<typeof getPositionDataFromDb>>[0];

const columnHelper = createColumnHelper<LiqTableData>();

export const numberFormat = "text-right mx-12";

export const columns = [
  columnHelper.accessor((row) => row.side, {
    id: "side",
    header: "🚀 | 📉",
    cell: (info) => {
      return (
        <div className="text-center">
          {info.getValue() === "BUY" ? "🚀" : "📉"}
        </div>
      );
    },
    enableSorting: true,
    sortingFn: "basic",
    //todo: turn on once the datalist issue is sorted
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.ammName, {
    id: "projectName",
    header: "project",
    cell: (info) => (
      <div className="mx-14">
        <a
          href={`https://nfex.io/trade/${info.getValue()}`}
          target="_blank"
          rel="noreferrer"
        >
          {info.getValue()}
        </a>
      </div>
    ),
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor((row) => row.marginRatio, {
    id: "marginRatio",
    header: "Margin Ratio",
    cell: (info) => {
      return <div className="text-center">{info.getValue()}</div>;
    },

    enableSorting: true,
    sortingFn: "basic",
  }),
  columnHelper.accessor((row) => row.marginRatioToMinimumMarginRatio, {
    id: "marginRatioToMinimumMarginRatio",
    header: () => {
      return (
        <div>
          margin ratio <br /> to min
        </div>
      );
    },
    cell: (info) => {
      return <div className="text-center">{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
  }),
  columnHelper.accessor((row) => row.entryPrice, {
    id: "entryPrice",
    header: () => {
      return <div>entry price</div>;
    },
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
  }),
  columnHelper.accessor((row) => row.liquidationPrice, {
    id: "liqPrice",
    header: "liq price",
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor((row) => row.markPrice, {
    id: "markPrice",
    header: () => {
      return <div>mark</div>;
    },
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row.markToLiq, {
    id: "markToLiq",
    header: () => {
      return (
        <div>
          Mark to Liq <br />
          (%)
        </div>
      );
    },
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row.leverage, {
    id: "leverage",
    header: "lev",
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor((row) => row.unrealizedPnl, {
    id: "nftPerpIndexToMark",
    header: () => {
      return (
        <div>
          <div>unrealized</div>
          <div>pnl</div>
        </div>
      );
    },
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),

  columnHelper.accessor((row) => row.size, {
    id: "size",
    header: "size",
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),

  columnHelper.accessor((row) => row.trader, {
    id: "trader",
    header: "Trader",
    cell: (info) => <TraderHoverCard trader={info.getValue()} />,
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),
  columnHelper.display({
    id: "liq",
    header: "👅",
    cell: (props) => (
      <LiqButton
        ammName={props.row.original.ammName}
        traderAddress={props.row.original.trader}
        isLiquidatable={props.row.original.isLiquidatable}
      />
    ),
  }),
];
