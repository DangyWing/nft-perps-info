import { z } from "zod";

export const NfexData = z.object({
  symbol_id: z.number(),
  base_cfn: z.string(),
  taker_fratio: z.string(),
  maker_fratio: z.string(),
  max_lever: z.string(),
  last_fund_rate_info: z.object({
    moment_fund_rate: z.string(),
    timestamp: z.number(),
    MomentBaseData: z.object({
      market_p: z.string(),
      index_p: z.string(),
    }),
  }),
});

export const NfexResponseSchema = z.object({
  errno: z.string(),
  msg: z.string(),
  data: z.array(NfexData),
});

export type NfexDataResponse = z.infer<typeof NfexResponseSchema>;
export type NfexData = z.infer<typeof NfexData>;

export type PerpData = {
  projectName: string;
  indexPrice: string;
  markPrice: string;
  fundingRate: string;
  indexToMark: number;
  nftPerpIndexPrice?: string;
  nftPerpMarkPrice?: string;
  nftPerpFundingRate?: string;
  nftPerpIndexToMark?: number;
};
export type NfexPerpData = {
  projectName: string;
  indexPrice: string;
  markPrice: string;
  fundingRate: string;
  indexToMark: number;
};

export type NftPerpData = {
  projectName: string;
  nftPerpIndexPrice: string;
  nftPerpMarkPrice: string;
  nftPerpFundingRate: string;
  nftPerpIndexToMark: number;
};

export type AMMResponse = {
  status: string;
  data: AMMData;
};

export type AMMData = {
  ammName: string;
  markPrice: string;
  indexPrice: string;
  feeRatio: string;
  fluctuationLimitRatio: string;
  initMarginRatio: string;
  maintenanceMarginRatio: string;
  liquidationFeeRatio: string;
  quoteAssetReserve: string;
  baseAssetReserve: string;
  openInterestNotionalCap: string;
  maxHoldingCap: string;
  netPositionSize: string;
  positionSizeLong: string;
  positionSizeShort: string;
  openInterestNotional: string;
  fundingPeriod: string;
  nextFundingTime: string;
  previousFundingRateLong: string;
  previousFundingRateShort: string;
  nextEstimatedFundingRateLong: string;
  nextEstimatedFundingRateShort: string;
};

export type NfexResponse = {
  errno: string;
  msg: string;
  data: Datum[];
};

export type Datum = {
  symbol_id: number;
  base_ccy: string;
  quote_ccy: QuoteCcy;
  base_cfn: string;
  base_csn: string;
  sort: number;
  ct_type: number;
  min_vol: string;
  max_vol: string;
  face_value: string;
  min_value: string;
  max_value: string;
  price_preci: string;
  vol_preci: string;
  amount_preci: string;
  price_threshold: string;
  taker_fratio: string;
  maker_fratio: string;
  init_imr: string;
  inc_imr: string;
  init_mmr: string;
  inc_mmr: string;
  base_risk: string;
  incr_risk: string;
  max_risk: string;
  pre_funding_rate: string;
  max_fate: string;
  min_frate: string;
  enable: boolean;
  visible: boolean;
  max_lever: string;
  depth_limit: string;
  funding_rate_order: number;
  init_fund_rate: string;
  last_fund_rate_info: LastFundRateInfo;
  fund_rate_config: FundRateConfig;
  risk_grade: number;
  grade_ratio: number;
  created_at: Date;
  updated_at: Date;
  trade_pair_leverage_list: TradePairLeverageList[];
  match_srv: string;
  market_price_threshold: string;
  url: string;
  impact_notional: string;
  contract_address: string;
  total_supply: number;
  ol_sta: number;
  attn: number;
  status: number;
};

export type FundRateConfig = {
  rate: string;
  set_time: Date;
  usage: boolean;
  use_time: Date;
  operator: number;
  state: boolean;
  version_id: number;
};

export interface LastFundRateInfo {
  trade_pair_id: number;
  timestamp: number;
  moment_fund_rate_state: boolean;
  moment_fund_rate: string;
  cum_fund_rate: string;
  current_period_fund_rate: string;
  origin_fund_rate: string;
  makeup_state: boolean;
  MomentBaseData: MomentBaseData;
  LimitData: LimitData;
  ServiceId: number;
  ncc_ts: number;
  cum_fund_rate_state: boolean;
}

export type LimitData = {
  max: string;
  min: string;
  config: string;
  cf_time: Date;
  cf_operator: number;
  cf_state: boolean;
  cf_version_id: number;
};

export type MomentBaseData = {
  market_p: string;
  biz_ts: number;
  index_p: string;
  index_ts: number;
};

export enum QuoteCcy {
  Eth = "ETH",
}

export interface TradePairLeverageList {
  trade_pair_id: number;
  max_position: string;
  initial_margin: string;
  maintenance_margin: string;
  max_leverage: number;
}
