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
    size: 175,
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: true,
    filterFn: "arrIncludesSome",
  }),
  {
    header: "Index Price",
    columns: [
      columnHelper.accessor((row) => row.indexPrice, {
        id: "indexPrice",
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
        size: 75,
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
        size: 75,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.nftPerpMarkToNfexIndex, {
        id: "perpMarkToNfexMark",
        header: "perp vs nfex",
        cell: (info) => {
          return <div>{info.getValue()?.toFixed(2)}</div>;
        },
        size: 75,
        enableSorting: true,
        sortingFn: "basic",
        sortUndefined: 1,
        enableColumnFilter: false,
      }),
    ],
  },
  {
    header: "Index To Mark (%)",
    columns: [
      columnHelper.accessor((row) => row.indexToMark, {
        id: "indexToMark",
        header: "nfex",
        cell: (info) => {
          return (
            <div className={numberFormat}> {info.getValue().toFixed(2)}</div>
          );
        },
        size: 75,
        enableSorting: true,
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.nftPerpIndexToMark, {
        id: "nftPerpIndexToMark",
        header: "NFTPerp",
        cell: (info) => {
          const indexToMark = info.getValue();
          return (
            indexToMark && (
              <div className={numberFormat}>{indexToMark.toFixed(2)}</div>
            )
          );
        },
        size: 75,
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
    ],
  },
  {
    header: "Funding Rate",
    columns: [
      columnHelper.accessor((row) => row.fundingRate, {
        id: "fundingRate",
        header: "Nfex",
        cell: (info) => {
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue())?.toFixed(4)}
            </div>
          );
        },
        enableSorting: true,
        enableColumnFilter: false,
        size: 75,
      }),
      columnHelper.accessor((row) => row.nftPerpFundingRate, {
        id: "nftPerpFundingRate",
        header: "NFTPerp",
        cell: (info) => {
          const fundingRate = info.getValue();
          return (
            fundingRate && (
              <div className={numberFormat}>
                {parseFloat(fundingRate)?.toFixed(4)}
              </div>
            )
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
        size: 75,
      }),
      columnHelper.accessor((row) => row.nftPerpFundingSide, {
        id: "nftPerpFundingType",
        header: "",
        cell: (info) => {
          return (
            info.getValue() && <p className="text-center">{info.getValue()}</p>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
    ],
  },
];
