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
        href={`https://nfex.io/trade/${info.getValue()}`}
        target="_blank"
        rel="noreferrer"
      >
        {info.getValue()}
      </a>
    ),
    enableSorting: true,
    sortingFn: "alphanumeric",
    enableColumnFilter: true,
    filterFn: "includesString",
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
              {parseFloat(info.getValue())?.toFixed(4)}
            </div>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor((row) => row.nftPerpIndexPrice, {
        id: "nftPerpIndexPrice",
        header: "NFTPerp",
        cell: (info) => {
          const indexPrice = info.getValue();
          return indexPrice ? (
            <div className={numberFormat}>
              {parseFloat(indexPrice)?.toFixed(4)}
            </div>
          ) : (
            <div className="text-center">-</div>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
        size: 100,
      }),
    ],
  },
  {
    header: "Mark Price",
    columns: [
      columnHelper.accessor((row) => row.markPrice, {
        id: "markPrice",
        header: "nfex",
        cell: (info) => {
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue())?.toFixed(2)}
            </div>
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.nftPerpMarkPrice, {
        id: "nftPerpMarkPrice",
        header: "NFTPerp",
        cell: (info) => {
          const markPrice = info.getValue();

          return markPrice ? (
            <div className={numberFormat}>
              {parseFloat(markPrice)?.toFixed(2)}
            </div>
          ) : (
            <div className="text-center">-</div>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
        size: 100,
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
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.nftPerpIndexToMark, {
        id: "nftPerpIndexToMark",
        header: "NFTPerp",
        cell: (info) => {
          const indexToMark = info.getValue();
          return indexToMark ? (
            <div className={numberFormat}>{indexToMark.toFixed(2)}</div>
          ) : (
            <div className="text-center">-</div>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
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
      }),
      columnHelper.accessor((row) => row.nftPerpFundingRate, {
        id: "nftPerpFundingRate",
        header: "NFTPerp",
        cell: (info) => {
          const fundingRate = info.getValue();

          return fundingRate ? (
            <div className={numberFormat}>
              {parseFloat(fundingRate)?.toFixed(4)}
            </div>
          ) : (
            <div className="text-center">-</div>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
      }),
    ],
  },
];
