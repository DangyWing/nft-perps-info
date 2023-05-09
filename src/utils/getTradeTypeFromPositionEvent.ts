import { type ProcessedPositionChangedEvent } from "@nftperp/sdk/types";

export function getTradeTypeFromPositionEvent(
  data: ProcessedPositionChangedEvent
) {
  switch (true) {
    case data.badDebt > "0":
      return "liquidated";
      break;
    case data.margin === "0" &&
      parseFloat(data.exchangedPositionSize) > 0 &&
      data.unrealizedPnlAfter === "0":
      return "completely closed a short";
      break;
    case data.margin === "0" &&
      parseFloat(data.exchangedPositionSize) < 0 &&
      data.unrealizedPnlAfter === "0":
      return "completely closed a long";
      break;
    case parseFloat(data.unrealizedPnlAfter) === 0 &&
      parseFloat(data.exchangedPositionSize) > 0:
      return "opened new long";
      break;
    case parseFloat(data.unrealizedPnlAfter) === 0 &&
      parseFloat(data.exchangedPositionSize) < 0:
      return "opened new short";
      break;
    case parseFloat(data.unrealizedPnlAfter) != 0 &&
      data.positionSizeAfter != "0" &&
      parseFloat(data.exchangedPositionSize) < 0:
      return "added to short";
      break;
    case parseFloat(data.unrealizedPnlAfter) != 0 &&
      data.positionSizeAfter != "0" &&
      parseFloat(data.exchangedPositionSize) > 0:
      return "added to long";
      break;
    case data.positionSizeAfter === "0":
      return "closed";
      break;
    case data.exchangedPositionSize === "0":
      return "no trade";
      break;
    case parseFloat(data.exchangedPositionSize) > 0 &&
      parseFloat(data.positionSizeAfter) < 0 &&
      data.unrealizedPnlAfter !== "0":
      return "completely closed a short";
      break;
    case parseFloat(data.positionSizeAfter) > 0 &&
      data.unrealizedPnlAfter !== "0":
      return "partially closed a long";
      break;
    default:
      return "idk";
  }
}
