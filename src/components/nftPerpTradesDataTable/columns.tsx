"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { LiqEventDisplay } from "~/types";
import { numberFormat } from "../liqDataTable/columns";
import { middleEllipsize } from "~/utils/middleEllipsize";

const columnHelper = createColumnHelper<LiqEventDisplay>();

export const columns = [
  columnHelper.accessor((row) => row.ammName, {
    id: "projectName",
    header: "Project",
    cell: (info) => <div className="flex items-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor((row) => row.markPrice, {
    id: "markPrice",
    header: "mark",
    cell: (info) => {
      return (
        <div className={numberFormat}>
          {parseFloat(info.getValue()).toFixed(3)}
        </div>
      );
    },
    // size: 25,
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.entryPrice, {
    id: "entryPrice",
    header: "entry",
    cell: (info) => {
      return (
        <div className={numberFormat}>
          {parseFloat(info.getValue()).toFixed(2)}
        </div>
      );
    },
    size: 25,
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.liquidationPrice, {
    id: "liquidationPrice",
    header: "liq price",
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    // size: 75,
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.margin, {
    id: "margin",
    header: "margin",
    cell: (info) => {
      return <div className={numberFormat}>{info.getValue()}</div>;
    },
    // size: 25,
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.side, {
    id: "side",
    header: "side",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    // size: 75,
    enableSorting: true,
    sortingFn: "basic",
    sortUndefined: 1,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.exchangedPositionSize, {
    id: "exchangedPositionSize",
    header: "size",
    cell: (info) => {
      return <div className="text-right">{info.getValue().toFixed(2)}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.exchangedPositionNotional, {
    id: "exchangedPositionNotional",
    header: "notional",
    cell: (info) => {
      return <div>{info.getValue().toFixed(2)}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.tradeType, {
    id: "tradeType",
    header: "type",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.trader, {
    id: "trader",
    header: "trader",
    cell: (info) => {
      return (
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://arbiscan.io/address/${info.getValue()}`}
        >
          {middleEllipsize(info.getValue())}
        </a>
      );
    },
    enableSorting: true,
    sortingFn: "basic",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.transactionHash, {
    id: "transactionHash",
    header: "tx hash",
    cell: (info) => {
      return (
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://arbiscan.io/tx/${info.getValue()}`}
        >
          {info.getValue().substring(0, 5)}
        </a>
      );
    },
    enableSorting: true,
    sortingFn: "basic",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.isLiquidatable, {
    id: "isLiquidatable",
    header: "liq ?",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    enableSorting: true,
    sortingFn: "basic",
    enableColumnFilter: false,
  }),
];
