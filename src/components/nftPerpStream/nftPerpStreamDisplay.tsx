"use client";

import { type ProcessedPositionChangedEvent } from "@nftperp/sdk/types";
import { useEffect, useState } from "react";
import { socket } from "../../utils/nftPerpSocket";
import { getTraderPositions } from "~/utils/getTraderPositions";
import type { LiqEventDisplay } from "~/types";

export function NftPerpStreamDisplay() {
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
    console.log(data);
    const trader = data.trader as `0x${string}`;
    const traderPositions = await getTraderPositions(trader);
    const relevantTraderPosition = traderPositions?.find(
      (traderPosition) => traderPosition.ammName === data.ammName
    );

    if (!relevantTraderPosition || data.exchangedPositionSize === "0") return;

    // const isLiquidatable =
    //   (relevantLiqPrice.side === "LONG" &&
    //     parseFloat(relevantLiqPrice.liquidationPrice) >
    //       parseFloat(data.markPrice)) ||
    //   (relevantLiqPrice.side === "SHORT" &&
    //     parseFloat(relevantLiqPrice.liquidationPrice) <
    //       parseFloat(data.markPrice));
    const isLiquidatable = true;

    if (isLiquidatable) {
      const liqData: LiqEventDisplay = {
        ammName: relevantTraderPosition.ammName,
        entryPrice: relevantTraderPosition.entryPrice,
        markPrice: relevantTraderPosition.markPrice,
        liquidationPrice: relevantTraderPosition.liquidationPrice,
        margin: relevantTraderPosition.margin,
        side: relevantTraderPosition.side,
        exchangedPositionSize: data.exchangedPositionSize,
        exchangedPositionNotional: data.exchangedPositionNotional,
        trader: relevantTraderPosition.trader,
        transactionHash: data.transactionHash as `0x${string}`,
      };
      setTraderEvents((previous) => [...previous, liqData]);
    }
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

  return (
    <div>
      <h1>NFT Perp Stream Display</h1>
      <div>
        <div>Connected: {isConnected ? "Yes" : "No"}</div>
        <div>Foo Events: {traderEvents.length}</div>
        {traderEvents.map((tradeEvent) => (
          <div key={tradeEvent.transactionHash}>
            <div>trader: {tradeEvent.trader}</div>
            <div>ammName: {tradeEvent.ammName}</div>
            <div>markPrice: {tradeEvent.markPrice}</div>
            <div>liquidationPrice: {tradeEvent.liquidationPrice}</div>
            <div>entryPrice: {tradeEvent.entryPrice}</div>
            <div>margin: {tradeEvent.margin}</div>
            <div>side: {tradeEvent.side}</div>
            <div>exchangedPositionSize: {tradeEvent.exchangedPositionSize}</div>
            <div>txHash: {tradeEvent.transactionHash}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
