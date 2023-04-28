"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type getAllTraderLiqPrices } from "~/app/lib/getAllTraderLiqPrices";
import { TraderHoverCard } from "../TraderHoverCard";
import { LiqButton } from "../liqAction/liqButton";

export type LiqTableData = Awaited<ReturnType<typeof getAllTraderLiqPrices>>[0];

const columnHelper = createColumnHelper<LiqTableData>();

export const columns = [
  columnHelper.accessor((row) => row.ammName, {
    id: "projectName",
    header: "project",
    cell: (info) => (
      <a
        href={`https://nfex.io/trade/${info.getValue()}`}
        target="_blank"
        rel="noreferrer"
      >
        {info.row.original.side === "BUY" ? "📉 " : "🚀 "}
        {info.getValue()}
      </a>
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
      return <div className="text-right">{info.getValue()}</div>;
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
      return <div className="text-right">{info.getValue()}</div>;
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
      return <div className="text-right">{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
  }),
  columnHelper.accessor((row) => row.liquidationPrice, {
    id: "liqPrice",
    header: "liq price",
    cell: (info) => {
      return <div className="text-right">{info.getValue()}</div>;
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
      return <div className="text-right">{info.getValue()}</div>;
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
      //   const markPrice = parseFloat(info.row.getValue("markPrice"));
      //   const liqPrice = parseFloat(info.row.getValue("liqPrice"));
      //   const markToLiq = Math.abs((markPrice - liqPrice) / markPrice) * 100;
      //   return <div className="text-right">{markToLiq.toFixed(1)}</div>;
      return <div className="text-right">{info.getValue()}</div>;
    },
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row.leverage, {
    id: "leverage",
    header: "lev",
    cell: (info) => {
      return <div className="text-right">{info.getValue()}</div>;
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
      return <div className="text-right">{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),

  columnHelper.accessor((row) => row.size, {
    id: "size",
    header: "size",
    cell: (info) => {
      return <div className="text-right">{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "alphanumeric",
  }),
  //   columnHelper.accessor((row) => row.notional, {
  //     id: "notional",
  //     header: "notional size",
  //     cell: (info) => {
  //       const markPrice = info.getValue();

  //       return markPrice ? (
  //         <div className="text-right">{parseFloat(markPrice)?.toFixed(2)}</div>
  //       ) : (
  //         <div className="text-right">-</div>
  //       );
  //     },
  //     enableSorting: true,
  //     sortingFn: "alphanumeric",
  //     size: 100,
  //   }),
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
  // columnHelper.accessor((row) => row.lastUpdatedTimestamp, {
  //   id: "lastUpdated",
  //   header: "last updated",
  //   cell: (info) => {
  //     return <div>{info.getValue()}</div>;
  //   },
  //   enableSorting: true,
  //   sortingFn: "alphanumeric",
  //   size: 150,
  // }),
];
