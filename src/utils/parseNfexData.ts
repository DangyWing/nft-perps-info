import { type NfexData, type NfexPerpData } from "~/types";
import { calculate_percentage_change } from "./utils";

export function parseNfexData(data: NfexData[]) {
  const perpData: NfexPerpData[] = data.map((row) => ({
    projectName: row.base_cfn,
    indexPrice: row.last_fund_rate_info.MomentBaseData.index_p,
    markPrice: row.last_fund_rate_info.MomentBaseData.market_p,
    fundingRate: row.last_fund_rate_info.moment_fund_rate,
    indexToMark: calculate_percentage_change(
      parseFloat(row.last_fund_rate_info.MomentBaseData.index_p),
      parseFloat(row.last_fund_rate_info.MomentBaseData.market_p)
    ),
    source: "nfex",
  }));

  return perpData;
}
