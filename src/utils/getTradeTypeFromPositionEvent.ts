import { type ProcessedPositionChangedEvent } from "@nftperp/sdk/types";

export function getTradeTypeFromPositionEvent(
  data: ProcessedPositionChangedEvent
) {
  switch (true) {
    case data.badDebt > "0":
      return "liquidated";

    case data.margin === "0" &&
      parseFloat(data.exchangedPositionSize) > 0 &&
      data.unrealizedPnlAfter === "0":
      return "closed a short";

    case data.margin === "0" &&
      parseFloat(data.exchangedPositionSize) < 0 &&
      data.unrealizedPnlAfter === "0":
      return "closed a long";
    case parseFloat(data.unrealizedPnlAfter) === 0 &&
      parseFloat(data.exchangedPositionSize) > 0:
      return "opened long";

    case parseFloat(data.unrealizedPnlAfter) === 0 &&
      parseFloat(data.exchangedPositionSize) < 0:
      return "opened short";

    case parseFloat(data.unrealizedPnlAfter) != 0 &&
      data.positionSizeAfter != "0" &&
      parseFloat(data.exchangedPositionSize) < 0:
      return "added to short";

    case parseFloat(data.unrealizedPnlAfter) != 0 &&
      data.positionSizeAfter != "0" &&
      parseFloat(data.exchangedPositionSize) > 0:
      return "added to long";

    case data.positionSizeAfter === "0":
      return "closed";

    case data.exchangedPositionSize === "0":
      return "no trade";

    case parseFloat(data.exchangedPositionSize) > 0 &&
      parseFloat(data.positionSizeAfter) < 0 &&
      data.unrealizedPnlAfter !== "0":
      return "completely closed a short";

    case parseFloat(data.positionSizeAfter) > 0 &&
      data.unrealizedPnlAfter !== "0":
      return "partially closed a long";

    default:
      return "idk";
  }
}
