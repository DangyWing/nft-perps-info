"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { NfexPerpData } from "~/types";
import { LegendPopover } from "../LegendPopover";
import { NfexOrderDepth } from "./nfexOrderDepth";

const numberFormat = "mx-auto w-min -translate-x-1/3 text-right";

const columnHelper = createColumnHelper<NfexPerpData>();

export const columns = [
  {
    header: () => <LegendPopover />,
    id: "projectName",
    columns: [
      columnHelper.accessor((row) => row.projectName, {
        id: "projectName",
        header: () => <div className="text-left">Project</div>,

        cell: (info) => (
          <a
            href={`https://nfex.io/trade/${info.row.original.nfexSlug}`}
            target="_blank"
            rel="noreferrer"
          >
            {info.getValue()}
          </a>
        ),
        size: 150,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: true,
        filterFn: "arrIncludesSome",
      }),
    ],
  },

  {
    header: "Index Price",
    id: "indexPrice",
    columns: [
      columnHelper.accessor((row) => row.indexPrice, {
        id: "nfexIndexPrice",
        header: () => <div className="text-right">nfex Index</div>,
        cell: (info) => {
          const amount = parseFloat(info.getValue());
          const formatted = new Intl.NumberFormat("en-US", {}).format(amount);

          return <div className={numberFormat}>{formatted}</div>;
        },

        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
    ],
  },
  {
    header: "Mark Price",
    columns: [
      columnHelper.accessor((row) => row.markPrice, {
        id: "nfexMarkPrice",
        header: () => <div className="text-center">nfex mark</div>,
        cell: (info) => {
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue())?.toFixed(2)}
            </div>
          );
        },
        enableSorting: true,
        enableColumnFilter: false,
      }),
    ],
  },
  columnHelper.accessor((row) => row.fundingRate, {
    id: "fundingRate",
    sortingFn: (rowA, rowB, columnId) => {
      const numA = Math.abs(rowA.getValue<number>(columnId));
      const numB = Math.abs(rowB.getValue<number>(columnId));

      return numA > numB ? 1 : numA < numB ? -1 : 0;
    },
    header: () => <div className="text-center">funding rate</div>,
    cell: (info) => {
      return (
        <div className={numberFormat}>
          {parseFloat(info.getValue())?.toFixed(2)}
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.indexToMark, {
    id: "indexToMark",
    sortingFn: (rowA, rowB, columnId) => {
      const numA = Math.abs(rowA.getValue<number>(columnId));
      const numB = Math.abs(rowB.getValue<number>(columnId));

      return numA > numB ? 1 : numA < numB ? -1 : 0;
    },
    header: () => <div className="text-center">index to mark (%)</div>,
    cell: (info) => {
      return (
        <div className={numberFormat}>
          {parseFloat(info.getValue())?.toFixed(2)}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "orderDepth",
    header: () => <div className="text-center">order depth</div>,
    cell: (info) => {
      const indexToMarkFloat = Math.abs(
        parseFloat(info.row.original.indexToMark)
      );

      const fundingRateFloat = Math.abs(
        parseFloat(info.row.original.fundingRate)
      );

      if (indexToMarkFloat > 1 || fundingRateFloat > 0.03) {
        return NfexOrderDepth({ symbolId: info.row.original.symbolId });
      }
    },
  }),
];
