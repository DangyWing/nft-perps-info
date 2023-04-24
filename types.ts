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
  remark: Remark;
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

export enum Remark {
  Empty = " ",
}

export interface TradePairLeverageList {
  trade_pair_id: number;
  max_position: string;
  initial_margin: string;
  maintenance_margin: string;
  max_leverage: number;
}
