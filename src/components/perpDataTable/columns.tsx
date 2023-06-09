"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { PerpData } from "~/types";
import { LegendPopover } from "../LegendPopover";
import { type Object } from "ts-toolbelt";
import { RowActions } from "./RowActions/rowActions";
import { isAddress } from "viem";
import { Donut } from "../ui/donut";
import { TooltipWithContent } from "../TooltipWithContent";

const numberFormat = "mx-auto w-min -translate-x-1/3 text-right";

type PerpDataWithUserStatus = Object.Merge<
  PerpData,
  { userStatus?: "long" | "short" | undefined }
>;

const columnHelper = createColumnHelper<PerpDataWithUserStatus>();

function donutHoleColor(ratio: number) {
  switch (true) {
    case ratio > 95:
      return "#18181b";
    case ratio > 90:
      return "#f97316";
    case ratio > 80:
      return "#eab308";
    case ratio > 70:
      return "#3b82f6";
    case ratio > 60:
      return "#22c55e";
    default:
      return "#ffffff";
  }
}

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
    header: "",
    id: "positions",
    columns: [
      columnHelper.accessor((row) => row.nftPerpPositionRatio, {
        id: "positionRatioDonut",
        header: "pos Ratio",
        cell: (info) => {
          const floatValue = parseFloat(info.getValue());

          const ratio = floatValue.toFixed(2) + "%";

          return (
            <TooltipWithContent content={ratio}>
              <Donut
                ratio={(parseFloat(info.getValue()) + 100) / 2}
                colorOne="#22c55e"
                colorTwo="#ef4444"
                backgroundColor={donutHoleColor(Math.abs(floatValue))}
              />
            </TooltipWithContent>
          );
        },
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
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue()).toFixed(2)}
            </div>
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
            <div className={numberFormat}>
              {parseFloat(info.getValue())?.toFixed(2)}
            </div>
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
      }),
      columnHelper.accessor((row) => row.nftPerpMarkToIndex, {
        id: "nftPerpMarkToIndex",
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
    id: "funding",
    columns: [
      columnHelper.accessor((row) => row.nftPerpFundingRate, {
        id: "nftPerpFundingRate",
        header: () => <div className="text-right">funding</div>,
        cell: (info) => {
          return (
            <div className={numberFormat}>
              {parseFloat(info.getValue()).toFixed(3)}
            </div>
          );
        },
        enableSorting: true,
        sortingFn: "basic",
        enableColumnFilter: false,
      }),
    ],
  },
  {
    id: "status",
    columns: [
      columnHelper.display({
        id: "feeStatus",
        header: "converging?",
        enableHiding: true,
        cell: (props) => {
          const { row } = props;
          return (
            <div className="text-center">
              {row.original.nftPerpDynamicFeeStatus}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "positionStatus",
        header: "your position",
        cell: (props) => {
          const { row } = props;
          return <div className="text-center">{row.original.userStatus}</div>;
        },
      }),
    ],
  },
  {
    id: "actions",
    columns: [
      columnHelper.display({
        id: "actions",
        cell: (props) => {
          const walletAddress = props.table.options.meta?.walletAddress;
          const side = props.row.original.userStatus;

          return (
            <RowActions
              ammName={props.row.original.projectName}
              ammAddress={
                isAddress(props.row.original.nftPerpAmmAddress)
                  ? props.row.original.nftPerpAmmAddress
                  : undefined
              }
              walletAddress={walletAddress}
              side={side}
            />
          );
        },
      }),
    ],
  },
];
