import { cache } from "react";
import { getTradersWithOpenPositions } from "~/utils/getTradersWithOpenPositions";
import { getLiqPricesForTrader } from "~/utils/getLiqPricesForTrader";
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
    const data = await getLiqPricesForTrader(item);

    if (!data) return [];

    data.map((item) => {
      if (item.size === "0") return [];
      item.maintenanceMargin = item.ammName === "ppg" ? 0.1 : 0.0625;

      item.lastUpdatedTimestamp = dayjs
        .unix(parseInt(item.lastUpdatedTimestamp))
        .fromNow();
      item.markToLiq = calculate_percentage_change(
        parseFloat(item.markPrice),
        parseFloat(item.liquidationPrice)
      ).toFixed(1);
      item.marginRatioToMinimumMarginRatio = (
        (parseFloat(item.marginRatio) - item.maintenanceMargin) *
        100
      ).toFixed(2);
      item.liquidationPrice = parseFloat(item.liquidationPrice).toFixed(2);
      item.marginRatio = parseFloat(item.marginRatio).toFixed(2);
      item.markPrice = parseFloat(item.markPrice).toFixed(2);
      item.liquidationPrice = parseFloat(item.liquidationPrice).toFixed(2);
      item.leverage = parseFloat(item.leverage).toFixed(2);
      item.unrealizedPnl = parseFloat(item.unrealizedPnl).toFixed(2);
      item.size = parseFloat(item.size).toFixed(4);

      return item;
    });

    traderData.push(data.filter(isTraderAmmPosition));
  }

  return traderData.flat();
});
