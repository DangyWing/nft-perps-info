import { type ProcessedPositionChangedEvent } from "@nftperp/sdk/types";
import { io, type Socket } from "socket.io-client";

export type ServerToClientEvents = {
  TRADE: (data: ProcessedPositionChangedEvent) => void;
  FUNDING: (data: ProcessedPositionChangedEvent) => void;
  MARGIN_CHANGE: (data: ProcessedPositionChangedEvent) => void;
};

const wssURL = "wss://api3.nftperp.xyz";

export const socket: Socket<ServerToClientEvents> = io(wssURL);
