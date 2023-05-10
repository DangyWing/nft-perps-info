"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { PerpData } from "../../types";
import { numberFormat } from "../liqDataTable/columns";

const columnHelper = createColumnHelper<PerpData>();

export const columns = [
  columnHelper.accessor((row) => row.projectName, {
    id: "projectName",
    header: "Project",
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
  {
    header: "Index Price",
    columns: [
      columnHelper.accessor((row) => row.indexPrice, {
        id: "nfexIndexPrice",
        header: "nfex",
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
      columnHelper.accessor((row) => row.nftPerpIndexPrice, {
        id: "nftPerpIndexPrice",
        header: "NFTPerp",
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
        size: 25,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.nftPerpIndexPrice, {
        id: "nftPerpIndexToNfexIndex",
        header: "nftperp/nfex",
        cell: (info) => {
          const nftPerpIndexPrice: string =
            info.row.getValue("nftPerpIndexPrice");
          const nfexIndexPrice: string = info.row.getValue("nfexIndexPrice");
          return (
            <div className={numberFormat}>
              {(
                parseFloat(nftPerpIndexPrice) - parseFloat(nfexIndexPrice)
              ).toFixed(2)}
            </div>
          );
        },
        size: 25,
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
        header: "nfex",
        cell: (info) => {
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue())?.toFixed(2)}
            </div>
          );
        },
        enableSorting: true,
        enableColumnFilter: false,
        size: 25,
      }),
      columnHelper.accessor((row) => row.nftPerpMarkPrice, {
        id: "nftPerpMarkPrice",
        header: "NFTPerp",
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
        size: 25,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.nftPerpMarkPrice, {
        id: "nftPerpMarkToNfexMark",
        header: "nftperp/nfex",
        cell: (info) => {
          const nftPerpMarkPrice = info.getValue();
          const nfexMarkPrice: string = info.row.getValue("nfexMarkPrice");
          return (
            <div className={numberFormat}>
              {(
                parseFloat(nftPerpMarkPrice) - parseFloat(nfexMarkPrice)
              ).toFixed(2)}
            </div>
          );
        },
        size: 25,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
    ],
  },
  {
    header: "Index To Mark (%)",
    columns: [
      columnHelper.accessor((row) => row.nftPerpMarkToNfexIndex, {
        id: "perpMarkToNfexIndex",
        header: "perp vs nfex",
        cell: (info) => {
          return <div>{info.getValue()?.toFixed(2)}</div>;
        },
        size: 75,
        enableSorting: true,

        sortingFn: (rowA, rowB, columnId) => {
          const numA = Math.abs(rowA.getValue<number>(columnId));
          const numB = Math.abs(rowB.getValue<number>(columnId));

          return numA > numB ? 1 : numA < numB ? -1 : 0;
        },
        sortUndefined: 1,
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.nftPerpIndexToMark, {
        id: "nftPerpIndexToMark",
        header: "NFTPerp",
        cell: (info) => {
          const indexToMark = info.getValue();
          return <div className={numberFormat}>{indexToMark.toFixed(2)}</div>;
        },
        size: 75,
        enableSorting: true,

        enableColumnFilter: false,
      }),
    ],
  },
  {
    header: "Funding",
    columns: [
      columnHelper.accessor((row) => row.nftPerpFundingRate, {
        id: "nftPerpFundingRate",
        header: "NFTPerp",
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
      }),
    ],
  },
];
