"use client";

import {
  type SortingState,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import type { LiqEventDisplay } from "~/types";
import { socket } from "~/utils/nftPerpSocket";
import { type ProcessedPositionChangedEvent } from "@nftperp/sdk/types";
import { getTraderPositions } from "~/utils/getTraderPositions";
import { getTradeTypeFromPositionEvent } from "~/utils/getTradeTypeFromPositionEvent";
import Image from "next/image";

export function TradesDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [isConnected, setIsConnected] = useState(false);
  const [traderEvents, setTraderEvents] = useState<LiqEventDisplay[]>([]);

  useEffect(() => {
    socket.connect();
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  async function onTradeEvent(data: ProcessedPositionChangedEvent) {
    const trader = data.trader as `0x${string}`;
    const traderPositions = await getTraderPositions(trader);
    const relevantTraderPosition = traderPositions?.find(
      (traderPosition) => traderPosition.ammName === data.ammName
    );

    if (!relevantTraderPosition || data.exchangedPositionSize === "0") return;
    const tradeType = getTradeTypeFromPositionEvent(data);

    const liqPrice =
      !relevantTraderPosition.liquidationPrice ||
      relevantTraderPosition.liquidationPrice === "0"
        ? 0
        : parseFloat(relevantTraderPosition.liquidationPrice);

    // this sucks but if there is no relevant trader position margin, get margin from the data object
    // if the relevant trader position margin is 0, then set it to "-"

    const marginNum = !relevantTraderPosition.margin
      ? parseFloat(data.margin).toFixed(2)
      : relevantTraderPosition.margin === "0"
      ? "-"
      : parseFloat(relevantTraderPosition.margin).toFixed(2);

    const isLiquidatable =
      (relevantTraderPosition.side === "LONG" &&
        liqPrice > parseFloat(data.markPrice)) ||
      (relevantTraderPosition.side === "SHORT" &&
        liqPrice < parseFloat(data.markPrice));

    const liqData: LiqEventDisplay = {
      ammName: relevantTraderPosition.ammName,
      entryPrice: relevantTraderPosition?.entryPrice ?? data.markPrice,
      markPrice: data.markPrice,
      liquidationPrice: liqPrice === 0 ? "-" : liqPrice.toFixed(2),
      margin: marginNum,
      side: relevantTraderPosition.side,
      exchangedPositionSize: parseFloat(data.exchangedPositionSize),
      exchangedPositionNotional: parseFloat(data.exchangedPositionNotional),
      trader: relevantTraderPosition.trader,
      transactionHash: data.transactionHash as `0x${string}`,
      isLiquidatable: isLiquidatable,
      tradeType: tradeType,
    };
    setTraderEvents((previous) => [liqData, ...previous]);
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    socket.on("connect", onConnect);
    socket.on("TRADE", onTradeEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("TRADE", onTradeEvent);
      socket.disconnect();
    };
  }, []);

  const table = useReactTable({
    data: traderEvents,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    enableColumnFilters: true,
    enableFilters: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const imageURLs = [
    "https://media.tenor.com/6RSRCt6Va0sAAAAC/gambling-problem.gif",
    "https://media.tenor.com/bHsSDAiy6FUAAAAC/betmore-money.gif",
    "https://media.tenor.com/PaYR5iS-jukAAAAC/poker-all-in.gif",
    "https://media.tenor.com/NWKdzSeCIWkAAAAC/timethemarkets-doge.gif",
  ];

  // get random index from the above array

  const imageURLToUse =
    imageURLs[Math.floor(Math.random() * imageURLs.length)] ??
    "https://media.tenor.com/6RSRCt6Va0sAAAAC/gambling-problem.gif";

  return (
    <div className="p-2">
      <div className="flex items-center">
        status:{" "}
        {isConnected ? (
          <div className="mx-1 rounded-full bg-green-500 p-2" />
        ) : (
          <div className="mx-1 rounded-full bg-red-600 p-2" />
        )}
      </div>
      {traderEvents.length === 0 ? (
        <div>
          <div className="text-center text-xl">no trades yet</div>
          <Image
            src={imageURLToUse}
            width={300}
            height={300}
            alt={"Bet More"}
          />
        </div>
      ) : (
        <div>
          <table className="border p-2">
            <thead className="px-2 text-xl uppercase">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className=" text-slate-800 dark:text-slate-200"
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "inline-flex min-w-max cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            <div className="inline-flex">
                              <div>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </div>
                              <div>
                                {{
                                  asc: <p className="mx-1">^</p>,
                                  desc: <p className="mx-1 rotate-180">^</p>,
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                            </div>
                          </div>
                          {header.column.getCanFilter() ? (
                            <div className="px-0"></div>
                          ) : null}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="p-2">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-pink-300 border-opacity-30"
                >
                  {/* todo: add left and right border if within header group */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
