"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { PerpData } from "~/types";
import { LegendPopover } from "../LegendPopover";
import { type Object } from "ts-toolbelt";
import { RowActions } from "./RowActions/rowActions";
import { isAddress, formatEther } from "viem";

const numberFormat = "mx-auto w-min -translate-x-1/3 text-right";

type PerpDataWithUserStatus = Object.Merge<
  PerpData,
  { userStatus?: "long" | "short" | undefined }
>;

const columnHelper = createColumnHelper<PerpDataWithUserStatus>();

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
    header: "Positions",
    id: "positions",
    columns: [
      columnHelper.accessor((row) => row.nftPerpPositionSizeLong, {
        id: "nftPerpPositionSizes",
        header: () => <div className="text-right">pos size</div>,
        cell: (info) => {
          return (
            <div>
              <div className={numberFormat}>
                {parseFloat(formatEther(info.getValue())).toFixed(2)}
              </div>
              <div className={numberFormat}>
                {parseFloat(
                  formatEther(info.row.original.nftPerpPositionSizeShort)
                ).toFixed(2)}
              </div>
            </div>
          );
        },
        enableSorting: true,
        sortingFn: "alphanumeric",
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.nftPerpPositionSizeShort, {
        id: "Position Ratio",
        header: () => <div className="text-right">pos ratio (%)</div>,
        cell: (info) => {
          const moreLongs =
            info.row.original.nftPerpPositionSizeLong >
            info.row.original.nftPerpPositionSizeShort;

          const positionSizeLong = parseFloat(
            formatEther(info.row.original.nftPerpPositionSizeLong)
          );
          const positionSizeShort = parseFloat(
            formatEther(info.row.original.nftPerpPositionSizeShort)
          );

          const longRatio =
            (positionSizeLong / (positionSizeLong + positionSizeShort)) * 100;

          const relevantRatio = moreLongs ? longRatio : 100 - longRatio;

          return (
            <div>
              <div className={numberFormat}>
                {" "}
                {moreLongs
                  ? relevantRatio.toFixed(2)
                  : "-" + relevantRatio.toFixed(2)}
              </div>
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
