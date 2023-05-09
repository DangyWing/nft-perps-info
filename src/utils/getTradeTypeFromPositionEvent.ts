import { type ProcessedPositionChangedEvent } from "@nftperp/sdk/types";

export function getTradeTypeFromPositionEvent(
  data: ProcessedPositionChangedEvent
) {
  let tradeType = "";
  switch (true) {
    case data.badDebt > "0":
      tradeType = "liquidated";
      break;
    case data.margin === "0" &&
      parseFloat(data.exchangedPositionSize) > 0 &&
      data.unrealizedPnlAfter === "0":
      tradeType = "completely closed a short";
      break;
    case data.margin === "0" &&
      parseFloat(data.exchangedPositionSize) < 0 &&
      data.unrealizedPnlAfter === "0":
      tradeType = "completely closed a long";
      break;
    case parseFloat(data.unrealizedPnlAfter) === 0 &&
      parseFloat(data.exchangedPositionSize) > 0:
      tradeType = "opened new long";
      break;
    case parseFloat(data.unrealizedPnlAfter) === 0 &&
      parseFloat(data.exchangedPositionSize) < 0:
      tradeType = "opened new short";
      break;
    case parseFloat(data.exchangedPositionSize) > 0:
      tradeType = "added";
      break;
    case data.positionSizeAfter === "0":
      tradeType = "closed";
      break;
    case data.exchangedPositionSize === "0":
      tradeType = "no trade";
      break;
    case parseFloat(data.exchangedPositionSize) > 0 &&
      parseFloat(data.positionSizeAfter) < 0 &&
      data.unrealizedPnlAfter !== "0":
      tradeType = "completely closed a short";
      break;
    case parseFloat(data.positionSizeAfter) > 0 &&
      data.unrealizedPnlAfter !== "0":
      tradeType = "partially closed a long";
      break;
    default:
      tradeType = "idk";
  }
  return tradeType;
}
