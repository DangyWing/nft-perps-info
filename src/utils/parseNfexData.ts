import { type NfexData, type NfexPerpData } from "~/types";
import { percentageChangeFromBase } from "./utils";

export function parseNfexData(data: NfexData[]) {
  const perpData: NfexPerpData[] = data.map((row) => ({
    projectName: row.base_cfn,
    nfexSlug: row.base_ccy,
    indexPrice: row.last_fund_rate_info.MomentBaseData.index_p,
    markPrice: row.last_fund_rate_info.MomentBaseData.market_p,
    fundingRate: (
      parseFloat(row.last_fund_rate_info.current_period_fund_rate) * 100
    ).toString(),
    indexToMark: percentageChangeFromBase(
      parseFloat(row.last_fund_rate_info.MomentBaseData.index_p),
      parseFloat(row.last_fund_rate_info.MomentBaseData.market_p)
    ).toFixed(4),
  }));

  return perpData;
}
