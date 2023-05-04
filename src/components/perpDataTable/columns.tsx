"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { PerpData } from "../../types";
import { numberFormat } from "../liqDataTable/columns";

const columnHelper = createColumnHelper<PerpData>();

function getBackgroundClass(float: number | null) {
  if (!float) {
    return "bg-gray-500";
  }

  switch (Math.floor(float)) {
    case 0:
      return "bg-red-500";
    case 1:
      return "bg-yellow-500";

    case 2:
      return "bg-green-600 h-full text-slate-100 text-center";

    case 3:
      return "bg-blue-500 h-full";

    case 4:
      return "bg-indigo-500";

    case 5:
      return "bg-purple-500";

    default:
      return "bg-gray-500";
  }
}

export const columns = [
  columnHelper.accessor((row) => row.projectName, {
    id: "projectName",
    header: "Project",
    cell: (info) => (
      <a
        // href={`https://nfex.io/trade/${info.row.original.nfexSlug}`}
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
      columnHelper.accessor((row) => row.nftPerpMarkToNfexMark, {
        id: "perpMarkToNfexMark",
        header: "perp vs nfex",
        cell: (info) => {
          const bgClass = getBackgroundClass(info.getValue());
          return <div className={bgClass}>{info.getValue()?.toFixed(2)}</div>;
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
