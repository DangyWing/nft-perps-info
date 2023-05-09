import { cache } from "react";
import { getTradersWithOpenPositions } from "~/utils/getTradersWithOpenPositions";
import { getTraderPositions } from "~/utils/getTraderPositions";
import { type TraderAmmPosition } from "~/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { calculate_percentage_change } from "~/utils/utils";

function isTraderAmmPosition(
  item: TraderAmmPosition | undefined
): item is TraderAmmPosition {
  return !!item && item.size !== "0";
}

dayjs.extend(relativeTime);

export const getAllTraderLiqPrices = cache(async () => {
  const traders = await getTradersWithOpenPositions();
  const traderData = [];

  for (const item of traders) {
    const data = await getTraderPositions(item);

    if (!data) return [];

    data.map((item) => {
      if (item.size === "0") return [];
      item.maintenanceMargin = item.ammName === "ppg" ? 0.1 : 0.0625;

      const markPrice = !item.markPrice ? 0 : parseFloat(item.markPrice);
      const liqPrice = !item.liquidationPrice
        ? 0
        : parseFloat(item.liquidationPrice);
      const marginRatio = !item.marginRatio ? 0 : parseFloat(item.marginRatio);

      item.markToLiq = calculate_percentage_change(markPrice, liqPrice).toFixed(
        1
      );
      item.marginRatioToMinimumMarginRatio = (
        marginRatio - item.maintenanceMargin
      ).toFixed(2);
      item.liquidationPrice = liqPrice.toFixed(2);
      item.marginRatio = marginRatio.toFixed(2);
      item.markPrice = markPrice.toFixed(2);
      item.leverage = !item.leverage
        ? "0"
        : parseFloat(item.leverage).toFixed(2);
      item.unrealizedPnl = !item.unrealizedPnl
        ? "0"
        : parseFloat(item.unrealizedPnl).toFixed(2);
      item.size = !item.size ? "0" : parseFloat(item.size).toFixed(4);
      item.entryPrice = !item.entryPrice
        ? "0"
        : parseFloat(item.entryPrice).toFixed(2);
      item.isLiquidatable =
        parseFloat(item.marginRatio) - item.maintenanceMargin < 0;

      return item;
    });

    traderData.push(data.filter(isTraderAmmPosition));
  }

  return traderData.flat();
});
