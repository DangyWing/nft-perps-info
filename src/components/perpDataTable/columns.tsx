"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { PerpData } from "../../types";
import { LegendPopover } from "../LegendPopover";

const numberFormat = "text-right align-middle px-2";

const columnHelper = createColumnHelper<PerpData>();

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
            href={
              info.row.original.nftPerpSlug
                ? `https://beta.nftperp.xyz/trade/${info.row.original.nftPerpSlug}`
                : `https://nfex.io/trade/${info.row.original.nfexSlug}`
            }
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
      columnHelper.accessor((row) => row.nftPerpIndexPrice, {
        id: "nftPerpIndexPrice",
        header: () => <div className="text-right">NFTPerp Index</div>,
        cell: (info) => {
          const indexPrice = info.getValue();
          return (
            indexPrice && (
              <div className={numberFormat}>
                {parseFloat(indexPrice)?.toFixed(2)}
              </div>
            )
          );
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
      columnHelper.accessor((row) => row.nftPerpMarkPrice, {
        id: "nftPerpMarkPrice",
        header: () => <div className="text-center">nftperp mark</div>,
        cell: (info) => {
          const markPrice = info.getValue();
          return (
            markPrice && (
              <div className={numberFormat}>
                {parseFloat(markPrice)?.toFixed(2)}
              </div>
            )
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
    ],
  },
  {
    header: "Index To Mark %",
    columns: [
      columnHelper.accessor((row) => row.nftPerpMarkToNfexIndex, {
        id: "perpMarkToNfexIndex",
        header: () => <div className="text-right">Perp vs Nfex</div>,
        cell: (info) => {
          return (
            <p className={numberFormat}>
              {parseFloat(info.getValue()).toFixed(2)}
            </p>
          );
        },
        sortingFn: (rowA, rowB, columnId) => {
          const numA = Math.abs(rowA.getValue<number>(columnId));
          const numB = Math.abs(rowB.getValue<number>(columnId));

          return numA > numB ? 1 : numA < numB ? -1 : 0;
        },
        enableSorting: true,
        sortUndefined: 1,
        enableColumnFilter: false,
        size: 75,
        maxSize: 75,
      }),
      columnHelper.accessor((row) => row.nftPerpIndexToMark, {
        id: "nftPerpIndexToMark",
        header: () => <div className="text-right">nftperp</div>,
        cell: (info) => {
          return (
            <p className={numberFormat}>
              {parseFloat(info.getValue()).toFixed(2)}
            </p>
          );
        },
        enableSorting: true,
        enableColumnFilter: false,
        size: 75,
      }),
    ],
  },
  {
    header: "Funding",
    columns: [
      columnHelper.accessor((row) => row.nftPerpFundingRate, {
        id: "nftPerpFundingRate",
        header: () => <div className="text-right">nftperp</div>,
        cell: (info) => {
          const shortOrLong = parseFloat(info.getValue()) < 0 ? "l" : "s";
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue())?.toFixed(3) + " " + shortOrLong}
            </div>
          );
        },
        enableSorting: true,
        sortingFn: "basic",
        enableColumnFilter: false,
        size: 75,
      }),
    ],
  },
];
