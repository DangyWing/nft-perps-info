// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { NftPerpTypes } from './sources/nftPerp/types';
import * as importedModule$0 from "./sources/nftPerp/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Amm = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  positionBalance: Scalars['BigInt'];
  openInterestSize: Scalars['BigInt'];
  openInterestNotional: Scalars['BigInt'];
  tradingVolume: Scalars['BigInt'];
  quoteAssetReserve: Scalars['BigInt'];
  baseAssetReserve: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
  timestamp?: Maybe<Scalars['BigInt']>;
};

export type AmmPosition = {
  id: Scalars['ID'];
  amm: Scalars['Bytes'];
  trader: Scalars['Bytes'];
  margin: Scalars['BigInt'];
  positionSize: Scalars['BigInt'];
  openNotional: Scalars['BigInt'];
  tradingVolume: Scalars['BigInt'];
  leverage: Scalars['BigInt'];
  entryPrice: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
  unrealizedPnl: Scalars['BigInt'];
  fundingPayment: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  badDebt: Scalars['BigInt'];
  liquidationPenalty: Scalars['BigInt'];
  totalPnlAmount: Scalars['BigInt'];
  position: Position;
  blockNumber?: Maybe<Scalars['BigInt']>;
  timestamp?: Maybe<Scalars['BigInt']>;
};

export type AmmPosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  trader?: InputMaybe<Scalars['Bytes']>;
  trader_not?: InputMaybe<Scalars['Bytes']>;
  trader_gt?: InputMaybe<Scalars['Bytes']>;
  trader_lt?: InputMaybe<Scalars['Bytes']>;
  trader_gte?: InputMaybe<Scalars['Bytes']>;
  trader_lte?: InputMaybe<Scalars['Bytes']>;
  trader_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_contains?: InputMaybe<Scalars['Bytes']>;
  trader_not_contains?: InputMaybe<Scalars['Bytes']>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSize?: InputMaybe<Scalars['BigInt']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openNotional?: InputMaybe<Scalars['BigInt']>;
  openNotional_not?: InputMaybe<Scalars['BigInt']>;
  openNotional_gt?: InputMaybe<Scalars['BigInt']>;
  openNotional_lt?: InputMaybe<Scalars['BigInt']>;
  openNotional_gte?: InputMaybe<Scalars['BigInt']>;
  openNotional_lte?: InputMaybe<Scalars['BigInt']>;
  openNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_not?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leverage?: InputMaybe<Scalars['BigInt']>;
  leverage_not?: InputMaybe<Scalars['BigInt']>;
  leverage_gt?: InputMaybe<Scalars['BigInt']>;
  leverage_lt?: InputMaybe<Scalars['BigInt']>;
  leverage_gte?: InputMaybe<Scalars['BigInt']>;
  leverage_lte?: InputMaybe<Scalars['BigInt']>;
  leverage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leverage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryPrice?: InputMaybe<Scalars['BigInt']>;
  entryPrice_not?: InputMaybe<Scalars['BigInt']>;
  entryPrice_gt?: InputMaybe<Scalars['BigInt']>;
  entryPrice_lt?: InputMaybe<Scalars['BigInt']>;
  entryPrice_gte?: InputMaybe<Scalars['BigInt']>;
  entryPrice_lte?: InputMaybe<Scalars['BigInt']>;
  entryPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnl?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_not?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt?: InputMaybe<Scalars['BigInt']>;
  badDebt_not?: InputMaybe<Scalars['BigInt']>;
  badDebt_gt?: InputMaybe<Scalars['BigInt']>;
  badDebt_lt?: InputMaybe<Scalars['BigInt']>;
  badDebt_gte?: InputMaybe<Scalars['BigInt']>;
  badDebt_lte?: InputMaybe<Scalars['BigInt']>;
  badDebt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_not?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPnlAmount?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPnlAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  position?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AmmPosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AmmPosition_filter>>>;
};

export type AmmPosition_orderBy =
  | 'id'
  | 'amm'
  | 'trader'
  | 'margin'
  | 'positionSize'
  | 'openNotional'
  | 'tradingVolume'
  | 'leverage'
  | 'entryPrice'
  | 'realizedPnl'
  | 'unrealizedPnl'
  | 'fundingPayment'
  | 'fee'
  | 'badDebt'
  | 'liquidationPenalty'
  | 'totalPnlAmount'
  | 'position'
  | 'position__id'
  | 'position__trader'
  | 'position__margin'
  | 'position__openNotional'
  | 'position__tradingVolume'
  | 'position__leverage'
  | 'position__realizedPnl'
  | 'position__unrealizedPnl'
  | 'position__fundingPayment'
  | 'position__fee'
  | 'position__badDebt'
  | 'position__liquidationPenalty'
  | 'position__totalPnlAmount'
  | 'position__blockNumber'
  | 'position__timestamp'
  | 'blockNumber'
  | 'timestamp';

export type Amm_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  positionBalance?: InputMaybe<Scalars['BigInt']>;
  positionBalance_not?: InputMaybe<Scalars['BigInt']>;
  positionBalance_gt?: InputMaybe<Scalars['BigInt']>;
  positionBalance_lt?: InputMaybe<Scalars['BigInt']>;
  positionBalance_gte?: InputMaybe<Scalars['BigInt']>;
  positionBalance_lte?: InputMaybe<Scalars['BigInt']>;
  positionBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openInterestSize?: InputMaybe<Scalars['BigInt']>;
  openInterestSize_not?: InputMaybe<Scalars['BigInt']>;
  openInterestSize_gt?: InputMaybe<Scalars['BigInt']>;
  openInterestSize_lt?: InputMaybe<Scalars['BigInt']>;
  openInterestSize_gte?: InputMaybe<Scalars['BigInt']>;
  openInterestSize_lte?: InputMaybe<Scalars['BigInt']>;
  openInterestSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openInterestSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openInterestNotional?: InputMaybe<Scalars['BigInt']>;
  openInterestNotional_not?: InputMaybe<Scalars['BigInt']>;
  openInterestNotional_gt?: InputMaybe<Scalars['BigInt']>;
  openInterestNotional_lt?: InputMaybe<Scalars['BigInt']>;
  openInterestNotional_gte?: InputMaybe<Scalars['BigInt']>;
  openInterestNotional_lte?: InputMaybe<Scalars['BigInt']>;
  openInterestNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openInterestNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_not?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAssetReserve?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserve_not?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserve_gt?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserve_lt?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserve_gte?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserve_lte?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserve_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAssetReserve_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAssetReserve?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserve_not?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserve_gt?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserve_lt?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserve_gte?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserve_lte?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserve_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAssetReserve_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Amm_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Amm_filter>>>;
};

export type Amm_orderBy =
  | 'id'
  | 'address'
  | 'positionBalance'
  | 'openInterestSize'
  | 'openInterestNotional'
  | 'tradingVolume'
  | 'quoteAssetReserve'
  | 'baseAssetReserve'
  | 'blockNumber'
  | 'timestamp';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Candle = {
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  interval: Scalars['Int'];
  amm: Scalars['Bytes'];
  open: Scalars['BigInt'];
  close: Scalars['BigInt'];
  low: Scalars['BigInt'];
  high: Scalars['BigInt'];
  volume: Scalars['BigInt'];
};

export type Candle_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  interval?: InputMaybe<Scalars['Int']>;
  interval_not?: InputMaybe<Scalars['Int']>;
  interval_gt?: InputMaybe<Scalars['Int']>;
  interval_lt?: InputMaybe<Scalars['Int']>;
  interval_gte?: InputMaybe<Scalars['Int']>;
  interval_lte?: InputMaybe<Scalars['Int']>;
  interval_in?: InputMaybe<Array<Scalars['Int']>>;
  interval_not_in?: InputMaybe<Array<Scalars['Int']>>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Candle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Candle_filter>>>;
};

export type Candle_orderBy =
  | 'id'
  | 'timestamp'
  | 'interval'
  | 'amm'
  | 'open'
  | 'close'
  | 'low'
  | 'high'
  | 'volume';

export type FundingPaymentEvent = {
  id: Scalars['ID'];
  amm: Scalars['Bytes'];
  markPrice: Scalars['BigInt'];
  indexPrice: Scalars['BigInt'];
  premiumFractionLong: Scalars['BigInt'];
  premiumFractionShort: Scalars['BigInt'];
  insuranceFundPnl: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type FundingPaymentEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  markPrice?: InputMaybe<Scalars['BigInt']>;
  markPrice_not?: InputMaybe<Scalars['BigInt']>;
  markPrice_gt?: InputMaybe<Scalars['BigInt']>;
  markPrice_lt?: InputMaybe<Scalars['BigInt']>;
  markPrice_gte?: InputMaybe<Scalars['BigInt']>;
  markPrice_lte?: InputMaybe<Scalars['BigInt']>;
  markPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexPrice?: InputMaybe<Scalars['BigInt']>;
  indexPrice_not?: InputMaybe<Scalars['BigInt']>;
  indexPrice_gt?: InputMaybe<Scalars['BigInt']>;
  indexPrice_lt?: InputMaybe<Scalars['BigInt']>;
  indexPrice_gte?: InputMaybe<Scalars['BigInt']>;
  indexPrice_lte?: InputMaybe<Scalars['BigInt']>;
  indexPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  premiumFractionLong?: InputMaybe<Scalars['BigInt']>;
  premiumFractionLong_not?: InputMaybe<Scalars['BigInt']>;
  premiumFractionLong_gt?: InputMaybe<Scalars['BigInt']>;
  premiumFractionLong_lt?: InputMaybe<Scalars['BigInt']>;
  premiumFractionLong_gte?: InputMaybe<Scalars['BigInt']>;
  premiumFractionLong_lte?: InputMaybe<Scalars['BigInt']>;
  premiumFractionLong_in?: InputMaybe<Array<Scalars['BigInt']>>;
  premiumFractionLong_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  premiumFractionShort?: InputMaybe<Scalars['BigInt']>;
  premiumFractionShort_not?: InputMaybe<Scalars['BigInt']>;
  premiumFractionShort_gt?: InputMaybe<Scalars['BigInt']>;
  premiumFractionShort_lt?: InputMaybe<Scalars['BigInt']>;
  premiumFractionShort_gte?: InputMaybe<Scalars['BigInt']>;
  premiumFractionShort_lte?: InputMaybe<Scalars['BigInt']>;
  premiumFractionShort_in?: InputMaybe<Array<Scalars['BigInt']>>;
  premiumFractionShort_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceFundPnl?: InputMaybe<Scalars['BigInt']>;
  insuranceFundPnl_not?: InputMaybe<Scalars['BigInt']>;
  insuranceFundPnl_gt?: InputMaybe<Scalars['BigInt']>;
  insuranceFundPnl_lt?: InputMaybe<Scalars['BigInt']>;
  insuranceFundPnl_gte?: InputMaybe<Scalars['BigInt']>;
  insuranceFundPnl_lte?: InputMaybe<Scalars['BigInt']>;
  insuranceFundPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceFundPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FundingPaymentEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FundingPaymentEvent_filter>>>;
};

export type FundingPaymentEvent_orderBy =
  | 'id'
  | 'amm'
  | 'markPrice'
  | 'indexPrice'
  | 'premiumFractionLong'
  | 'premiumFractionShort'
  | 'insuranceFundPnl'
  | 'blockNumber'
  | 'timestamp';

export type FundingRateUpdatedEvent = {
  id: Scalars['ID'];
  amm: Scalars['Bytes'];
  fundingRateLong: Scalars['BigInt'];
  fundingRateShort: Scalars['BigInt'];
  underlyingPrice: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type FundingRateUpdatedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  fundingRateLong?: InputMaybe<Scalars['BigInt']>;
  fundingRateLong_not?: InputMaybe<Scalars['BigInt']>;
  fundingRateLong_gt?: InputMaybe<Scalars['BigInt']>;
  fundingRateLong_lt?: InputMaybe<Scalars['BigInt']>;
  fundingRateLong_gte?: InputMaybe<Scalars['BigInt']>;
  fundingRateLong_lte?: InputMaybe<Scalars['BigInt']>;
  fundingRateLong_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingRateLong_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingRateShort?: InputMaybe<Scalars['BigInt']>;
  fundingRateShort_not?: InputMaybe<Scalars['BigInt']>;
  fundingRateShort_gt?: InputMaybe<Scalars['BigInt']>;
  fundingRateShort_lt?: InputMaybe<Scalars['BigInt']>;
  fundingRateShort_gte?: InputMaybe<Scalars['BigInt']>;
  fundingRateShort_lte?: InputMaybe<Scalars['BigInt']>;
  fundingRateShort_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingRateShort_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  underlyingPrice?: InputMaybe<Scalars['BigInt']>;
  underlyingPrice_not?: InputMaybe<Scalars['BigInt']>;
  underlyingPrice_gt?: InputMaybe<Scalars['BigInt']>;
  underlyingPrice_lt?: InputMaybe<Scalars['BigInt']>;
  underlyingPrice_gte?: InputMaybe<Scalars['BigInt']>;
  underlyingPrice_lte?: InputMaybe<Scalars['BigInt']>;
  underlyingPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  underlyingPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FundingRateUpdatedEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FundingRateUpdatedEvent_filter>>>;
};

export type FundingRateUpdatedEvent_orderBy =
  | 'id'
  | 'amm'
  | 'fundingRateLong'
  | 'fundingRateShort'
  | 'underlyingPrice'
  | 'blockNumber'
  | 'timestamp';

export type MarginChangedEvent = {
  id: Scalars['ID'];
  sender: Scalars['Bytes'];
  amm: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  fundingPayment: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type MarginChangedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_gt?: InputMaybe<Scalars['Bytes']>;
  sender_lt?: InputMaybe<Scalars['Bytes']>;
  sender_gte?: InputMaybe<Scalars['Bytes']>;
  sender_lte?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_not?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarginChangedEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarginChangedEvent_filter>>>;
};

export type MarginChangedEvent_orderBy =
  | 'id'
  | 'sender'
  | 'amm'
  | 'amount'
  | 'fundingPayment'
  | 'blockNumber'
  | 'timestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Position = {
  id: Scalars['ID'];
  trader: Scalars['Bytes'];
  margin: Scalars['BigInt'];
  openNotional: Scalars['BigInt'];
  tradingVolume: Scalars['BigInt'];
  leverage: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
  unrealizedPnl: Scalars['BigInt'];
  fundingPayment: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  badDebt: Scalars['BigInt'];
  liquidationPenalty: Scalars['BigInt'];
  totalPnlAmount: Scalars['BigInt'];
  ammPositions: Array<AmmPosition>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  timestamp?: Maybe<Scalars['BigInt']>;
};


export type PositionammPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmmPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AmmPosition_filter>;
};

export type PositionChangedEvent = {
  id: Scalars['ID'];
  trader: Scalars['Bytes'];
  amm: Scalars['Bytes'];
  margin: Scalars['BigInt'];
  exchangedPositionNotional: Scalars['BigInt'];
  exchangedPositionSize: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  positionSizeAfter: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
  unrealizedPnlAfter: Scalars['BigInt'];
  badDebt: Scalars['BigInt'];
  liquidationPenalty: Scalars['BigInt'];
  markPrice: Scalars['BigInt'];
  fundingPayment: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type PositionChangedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  trader?: InputMaybe<Scalars['Bytes']>;
  trader_not?: InputMaybe<Scalars['Bytes']>;
  trader_gt?: InputMaybe<Scalars['Bytes']>;
  trader_lt?: InputMaybe<Scalars['Bytes']>;
  trader_gte?: InputMaybe<Scalars['Bytes']>;
  trader_lte?: InputMaybe<Scalars['Bytes']>;
  trader_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_contains?: InputMaybe<Scalars['Bytes']>;
  trader_not_contains?: InputMaybe<Scalars['Bytes']>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangedPositionNotional?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionNotional_not?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionNotional_gt?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionNotional_lt?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionNotional_gte?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionNotional_lte?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangedPositionNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangedPositionSize?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionSize_not?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionSize_gt?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionSize_lt?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionSize_gte?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionSize_lte?: InputMaybe<Scalars['BigInt']>;
  exchangedPositionSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangedPositionSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSizeAfter?: InputMaybe<Scalars['BigInt']>;
  positionSizeAfter_not?: InputMaybe<Scalars['BigInt']>;
  positionSizeAfter_gt?: InputMaybe<Scalars['BigInt']>;
  positionSizeAfter_lt?: InputMaybe<Scalars['BigInt']>;
  positionSizeAfter_gte?: InputMaybe<Scalars['BigInt']>;
  positionSizeAfter_lte?: InputMaybe<Scalars['BigInt']>;
  positionSizeAfter_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSizeAfter_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnlAfter?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnlAfter_not?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnlAfter_gt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnlAfter_lt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnlAfter_gte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnlAfter_lte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnlAfter_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnlAfter_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt?: InputMaybe<Scalars['BigInt']>;
  badDebt_not?: InputMaybe<Scalars['BigInt']>;
  badDebt_gt?: InputMaybe<Scalars['BigInt']>;
  badDebt_lt?: InputMaybe<Scalars['BigInt']>;
  badDebt_gte?: InputMaybe<Scalars['BigInt']>;
  badDebt_lte?: InputMaybe<Scalars['BigInt']>;
  badDebt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_not?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice?: InputMaybe<Scalars['BigInt']>;
  markPrice_not?: InputMaybe<Scalars['BigInt']>;
  markPrice_gt?: InputMaybe<Scalars['BigInt']>;
  markPrice_lt?: InputMaybe<Scalars['BigInt']>;
  markPrice_gte?: InputMaybe<Scalars['BigInt']>;
  markPrice_lte?: InputMaybe<Scalars['BigInt']>;
  markPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_not?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionChangedEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PositionChangedEvent_filter>>>;
};

export type PositionChangedEvent_orderBy =
  | 'id'
  | 'trader'
  | 'amm'
  | 'margin'
  | 'exchangedPositionNotional'
  | 'exchangedPositionSize'
  | 'fee'
  | 'positionSizeAfter'
  | 'realizedPnl'
  | 'unrealizedPnlAfter'
  | 'badDebt'
  | 'liquidationPenalty'
  | 'markPrice'
  | 'fundingPayment'
  | 'blockNumber'
  | 'timestamp';

export type PositionLiquidatedEvent = {
  id: Scalars['ID'];
  trader: Scalars['Bytes'];
  amm: Scalars['Bytes'];
  positionNotional: Scalars['BigInt'];
  positionSize: Scalars['BigInt'];
  liquidationFee: Scalars['BigInt'];
  liquidator: Scalars['Bytes'];
  badDebt: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type PositionLiquidatedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  trader?: InputMaybe<Scalars['Bytes']>;
  trader_not?: InputMaybe<Scalars['Bytes']>;
  trader_gt?: InputMaybe<Scalars['Bytes']>;
  trader_lt?: InputMaybe<Scalars['Bytes']>;
  trader_gte?: InputMaybe<Scalars['Bytes']>;
  trader_lte?: InputMaybe<Scalars['Bytes']>;
  trader_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_contains?: InputMaybe<Scalars['Bytes']>;
  trader_not_contains?: InputMaybe<Scalars['Bytes']>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  positionNotional?: InputMaybe<Scalars['BigInt']>;
  positionNotional_not?: InputMaybe<Scalars['BigInt']>;
  positionNotional_gt?: InputMaybe<Scalars['BigInt']>;
  positionNotional_lt?: InputMaybe<Scalars['BigInt']>;
  positionNotional_gte?: InputMaybe<Scalars['BigInt']>;
  positionNotional_lte?: InputMaybe<Scalars['BigInt']>;
  positionNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSize?: InputMaybe<Scalars['BigInt']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationFee?: InputMaybe<Scalars['BigInt']>;
  liquidationFee_not?: InputMaybe<Scalars['BigInt']>;
  liquidationFee_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationFee_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationFee_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationFee_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidator?: InputMaybe<Scalars['Bytes']>;
  liquidator_not?: InputMaybe<Scalars['Bytes']>;
  liquidator_gt?: InputMaybe<Scalars['Bytes']>;
  liquidator_lt?: InputMaybe<Scalars['Bytes']>;
  liquidator_gte?: InputMaybe<Scalars['Bytes']>;
  liquidator_lte?: InputMaybe<Scalars['Bytes']>;
  liquidator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  liquidator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  liquidator_contains?: InputMaybe<Scalars['Bytes']>;
  liquidator_not_contains?: InputMaybe<Scalars['Bytes']>;
  badDebt?: InputMaybe<Scalars['BigInt']>;
  badDebt_not?: InputMaybe<Scalars['BigInt']>;
  badDebt_gt?: InputMaybe<Scalars['BigInt']>;
  badDebt_lt?: InputMaybe<Scalars['BigInt']>;
  badDebt_gte?: InputMaybe<Scalars['BigInt']>;
  badDebt_lte?: InputMaybe<Scalars['BigInt']>;
  badDebt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionLiquidatedEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PositionLiquidatedEvent_filter>>>;
};

export type PositionLiquidatedEvent_orderBy =
  | 'id'
  | 'trader'
  | 'amm'
  | 'positionNotional'
  | 'positionSize'
  | 'liquidationFee'
  | 'liquidator'
  | 'badDebt'
  | 'blockNumber'
  | 'timestamp';

export type Position_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  trader?: InputMaybe<Scalars['Bytes']>;
  trader_not?: InputMaybe<Scalars['Bytes']>;
  trader_gt?: InputMaybe<Scalars['Bytes']>;
  trader_lt?: InputMaybe<Scalars['Bytes']>;
  trader_gte?: InputMaybe<Scalars['Bytes']>;
  trader_lte?: InputMaybe<Scalars['Bytes']>;
  trader_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trader_contains?: InputMaybe<Scalars['Bytes']>;
  trader_not_contains?: InputMaybe<Scalars['Bytes']>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openNotional?: InputMaybe<Scalars['BigInt']>;
  openNotional_not?: InputMaybe<Scalars['BigInt']>;
  openNotional_gt?: InputMaybe<Scalars['BigInt']>;
  openNotional_lt?: InputMaybe<Scalars['BigInt']>;
  openNotional_gte?: InputMaybe<Scalars['BigInt']>;
  openNotional_lte?: InputMaybe<Scalars['BigInt']>;
  openNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_not?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leverage?: InputMaybe<Scalars['BigInt']>;
  leverage_not?: InputMaybe<Scalars['BigInt']>;
  leverage_gt?: InputMaybe<Scalars['BigInt']>;
  leverage_lt?: InputMaybe<Scalars['BigInt']>;
  leverage_gte?: InputMaybe<Scalars['BigInt']>;
  leverage_lte?: InputMaybe<Scalars['BigInt']>;
  leverage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leverage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnl?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_not?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt?: InputMaybe<Scalars['BigInt']>;
  badDebt_not?: InputMaybe<Scalars['BigInt']>;
  badDebt_gt?: InputMaybe<Scalars['BigInt']>;
  badDebt_lt?: InputMaybe<Scalars['BigInt']>;
  badDebt_gte?: InputMaybe<Scalars['BigInt']>;
  badDebt_lte?: InputMaybe<Scalars['BigInt']>;
  badDebt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  badDebt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_not?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationPenalty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPnlAmount?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalPnlAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPnlAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ammPositions_?: InputMaybe<AmmPosition_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Position_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Position_filter>>>;
};

export type Position_orderBy =
  | 'id'
  | 'trader'
  | 'margin'
  | 'openNotional'
  | 'tradingVolume'
  | 'leverage'
  | 'realizedPnl'
  | 'unrealizedPnl'
  | 'fundingPayment'
  | 'fee'
  | 'badDebt'
  | 'liquidationPenalty'
  | 'totalPnlAmount'
  | 'ammPositions'
  | 'blockNumber'
  | 'timestamp';

export type Query = {
  position?: Maybe<Position>;
  positions: Array<Position>;
  ammPosition?: Maybe<AmmPosition>;
  ammPositions: Array<AmmPosition>;
  amm?: Maybe<Amm>;
  amms: Array<Amm>;
  positionChangedEvent?: Maybe<PositionChangedEvent>;
  positionChangedEvents: Array<PositionChangedEvent>;
  positionLiquidatedEvent?: Maybe<PositionLiquidatedEvent>;
  positionLiquidatedEvents: Array<PositionLiquidatedEvent>;
  fundingRateUpdatedEvent?: Maybe<FundingRateUpdatedEvent>;
  fundingRateUpdatedEvents: Array<FundingRateUpdatedEvent>;
  marginChangedEvent?: Maybe<MarginChangedEvent>;
  marginChangedEvents: Array<MarginChangedEvent>;
  trader?: Maybe<Trader>;
  traders: Array<Trader>;
  traderDayData?: Maybe<TraderDayData>;
  traderDayDatas: Array<TraderDayData>;
  candle?: Maybe<Candle>;
  candles: Array<Candle>;
  fundingPaymentEvent?: Maybe<FundingPaymentEvent>;
  fundingPaymentEvents: Array<FundingPaymentEvent>;
  repegEvent?: Maybe<RepegEvent>;
  repegEvents: Array<RepegEvent>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerypositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Position_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Position_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryammPositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryammPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmmPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AmmPosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryammArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryammsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Amm_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Amm_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionChangedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionChangedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PositionChangedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionLiquidatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionLiquidatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionLiquidatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PositionLiquidatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfundingRateUpdatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfundingRateUpdatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingRateUpdatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FundingRateUpdatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarginChangedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarginChangedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarginChangedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytraderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytradersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trader_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trader_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytraderDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytraderDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TraderDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TraderDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Candle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfundingPaymentEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfundingPaymentEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingPaymentEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FundingPaymentEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrepegEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrepegEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepegEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RepegEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RepegEvent = {
  id: Scalars['ID'];
  amm: Scalars['Bytes'];
  quoteAssetReserveBefore: Scalars['BigInt'];
  baseAssetReserveBefore: Scalars['BigInt'];
  quoteAssetReserveAfter: Scalars['BigInt'];
  baseAssetReserveAfter: Scalars['BigInt'];
  repegPnl: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type RepegEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amm?: InputMaybe<Scalars['Bytes']>;
  amm_not?: InputMaybe<Scalars['Bytes']>;
  amm_gt?: InputMaybe<Scalars['Bytes']>;
  amm_lt?: InputMaybe<Scalars['Bytes']>;
  amm_gte?: InputMaybe<Scalars['Bytes']>;
  amm_lte?: InputMaybe<Scalars['Bytes']>;
  amm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amm_contains?: InputMaybe<Scalars['Bytes']>;
  amm_not_contains?: InputMaybe<Scalars['Bytes']>;
  quoteAssetReserveBefore?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveBefore_not?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveBefore_gt?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveBefore_lt?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveBefore_gte?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveBefore_lte?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveBefore_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAssetReserveBefore_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAssetReserveBefore?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveBefore_not?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveBefore_gt?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveBefore_lt?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveBefore_gte?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveBefore_lte?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveBefore_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAssetReserveBefore_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAssetReserveAfter?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveAfter_not?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveAfter_gt?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveAfter_lt?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveAfter_gte?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveAfter_lte?: InputMaybe<Scalars['BigInt']>;
  quoteAssetReserveAfter_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAssetReserveAfter_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAssetReserveAfter?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveAfter_not?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveAfter_gt?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveAfter_lt?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveAfter_gte?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveAfter_lte?: InputMaybe<Scalars['BigInt']>;
  baseAssetReserveAfter_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAssetReserveAfter_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  repegPnl?: InputMaybe<Scalars['BigInt']>;
  repegPnl_not?: InputMaybe<Scalars['BigInt']>;
  repegPnl_gt?: InputMaybe<Scalars['BigInt']>;
  repegPnl_lt?: InputMaybe<Scalars['BigInt']>;
  repegPnl_gte?: InputMaybe<Scalars['BigInt']>;
  repegPnl_lte?: InputMaybe<Scalars['BigInt']>;
  repegPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  repegPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RepegEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RepegEvent_filter>>>;
};

export type RepegEvent_orderBy =
  | 'id'
  | 'amm'
  | 'quoteAssetReserveBefore'
  | 'baseAssetReserveBefore'
  | 'quoteAssetReserveAfter'
  | 'baseAssetReserveAfter'
  | 'repegPnl'
  | 'blockNumber'
  | 'timestamp';

export type Subscription = {
  position?: Maybe<Position>;
  positions: Array<Position>;
  ammPosition?: Maybe<AmmPosition>;
  ammPositions: Array<AmmPosition>;
  amm?: Maybe<Amm>;
  amms: Array<Amm>;
  positionChangedEvent?: Maybe<PositionChangedEvent>;
  positionChangedEvents: Array<PositionChangedEvent>;
  positionLiquidatedEvent?: Maybe<PositionLiquidatedEvent>;
  positionLiquidatedEvents: Array<PositionLiquidatedEvent>;
  fundingRateUpdatedEvent?: Maybe<FundingRateUpdatedEvent>;
  fundingRateUpdatedEvents: Array<FundingRateUpdatedEvent>;
  marginChangedEvent?: Maybe<MarginChangedEvent>;
  marginChangedEvents: Array<MarginChangedEvent>;
  trader?: Maybe<Trader>;
  traders: Array<Trader>;
  traderDayData?: Maybe<TraderDayData>;
  traderDayDatas: Array<TraderDayData>;
  candle?: Maybe<Candle>;
  candles: Array<Candle>;
  fundingPaymentEvent?: Maybe<FundingPaymentEvent>;
  fundingPaymentEvents: Array<FundingPaymentEvent>;
  repegEvent?: Maybe<RepegEvent>;
  repegEvents: Array<RepegEvent>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionpositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Position_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Position_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionammPositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionammPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmmPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AmmPosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionammArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionammsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Amm_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Amm_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpositionChangedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpositionChangedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PositionChangedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpositionLiquidatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpositionLiquidatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionLiquidatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PositionLiquidatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfundingRateUpdatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfundingRateUpdatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingRateUpdatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FundingRateUpdatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarginChangedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarginChangedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarginChangedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontraderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontradersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trader_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trader_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontraderDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontraderDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TraderDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TraderDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Candle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfundingPaymentEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfundingPaymentEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingPaymentEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FundingPaymentEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrepegEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrepegEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepegEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RepegEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Trader = {
  id: Scalars['ID'];
  position: Position;
  dayData?: Maybe<Array<TraderDayData>>;
};


export type TraderdayDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TraderDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TraderDayData_filter>;
};

export type TraderDayData = {
  id: Scalars['ID'];
  trader: Trader;
  date: Scalars['BigInt'];
  tradingVolume: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  fundingPayment: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
};

export type TraderDayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  trader?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_filter>;
  date?: InputMaybe<Scalars['BigInt']>;
  date_not?: InputMaybe<Scalars['BigInt']>;
  date_gt?: InputMaybe<Scalars['BigInt']>;
  date_lt?: InputMaybe<Scalars['BigInt']>;
  date_gte?: InputMaybe<Scalars['BigInt']>;
  date_lte?: InputMaybe<Scalars['BigInt']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']>>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_not?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lt?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_gte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_lte?: InputMaybe<Scalars['BigInt']>;
  tradingVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradingVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_not?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lt?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_gte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_lte?: InputMaybe<Scalars['BigInt']>;
  fundingPayment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingPayment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TraderDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TraderDayData_filter>>>;
};

export type TraderDayData_orderBy =
  | 'id'
  | 'trader'
  | 'trader__id'
  | 'date'
  | 'tradingVolume'
  | 'fee'
  | 'fundingPayment'
  | 'realizedPnl';

export type Trader_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  position?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_filter>;
  dayData_?: InputMaybe<TraderDayData_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Trader_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Trader_filter>>>;
};

export type Trader_orderBy =
  | 'id'
  | 'position'
  | 'position__id'
  | 'position__trader'
  | 'position__margin'
  | 'position__openNotional'
  | 'position__tradingVolume'
  | 'position__leverage'
  | 'position__realizedPnl'
  | 'position__unrealizedPnl'
  | 'position__fundingPayment'
  | 'position__fee'
  | 'position__badDebt'
  | 'position__liquidationPenalty'
  | 'position__totalPnlAmount'
  | 'position__blockNumber'
  | 'position__timestamp'
  | 'dayData';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Amm: ResolverTypeWrapper<Amm>;
  AmmPosition: ResolverTypeWrapper<AmmPosition>;
  AmmPosition_filter: AmmPosition_filter;
  AmmPosition_orderBy: AmmPosition_orderBy;
  Amm_filter: Amm_filter;
  Amm_orderBy: Amm_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Candle: ResolverTypeWrapper<Candle>;
  Candle_filter: Candle_filter;
  Candle_orderBy: Candle_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FundingPaymentEvent: ResolverTypeWrapper<FundingPaymentEvent>;
  FundingPaymentEvent_filter: FundingPaymentEvent_filter;
  FundingPaymentEvent_orderBy: FundingPaymentEvent_orderBy;
  FundingRateUpdatedEvent: ResolverTypeWrapper<FundingRateUpdatedEvent>;
  FundingRateUpdatedEvent_filter: FundingRateUpdatedEvent_filter;
  FundingRateUpdatedEvent_orderBy: FundingRateUpdatedEvent_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MarginChangedEvent: ResolverTypeWrapper<MarginChangedEvent>;
  MarginChangedEvent_filter: MarginChangedEvent_filter;
  MarginChangedEvent_orderBy: MarginChangedEvent_orderBy;
  OrderDirection: OrderDirection;
  Position: ResolverTypeWrapper<Position>;
  PositionChangedEvent: ResolverTypeWrapper<PositionChangedEvent>;
  PositionChangedEvent_filter: PositionChangedEvent_filter;
  PositionChangedEvent_orderBy: PositionChangedEvent_orderBy;
  PositionLiquidatedEvent: ResolverTypeWrapper<PositionLiquidatedEvent>;
  PositionLiquidatedEvent_filter: PositionLiquidatedEvent_filter;
  PositionLiquidatedEvent_orderBy: PositionLiquidatedEvent_orderBy;
  Position_filter: Position_filter;
  Position_orderBy: Position_orderBy;
  Query: ResolverTypeWrapper<{}>;
  RepegEvent: ResolverTypeWrapper<RepegEvent>;
  RepegEvent_filter: RepegEvent_filter;
  RepegEvent_orderBy: RepegEvent_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Trader: ResolverTypeWrapper<Trader>;
  TraderDayData: ResolverTypeWrapper<TraderDayData>;
  TraderDayData_filter: TraderDayData_filter;
  TraderDayData_orderBy: TraderDayData_orderBy;
  Trader_filter: Trader_filter;
  Trader_orderBy: Trader_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Amm: Amm;
  AmmPosition: AmmPosition;
  AmmPosition_filter: AmmPosition_filter;
  Amm_filter: Amm_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Candle: Candle;
  Candle_filter: Candle_filter;
  Float: Scalars['Float'];
  FundingPaymentEvent: FundingPaymentEvent;
  FundingPaymentEvent_filter: FundingPaymentEvent_filter;
  FundingRateUpdatedEvent: FundingRateUpdatedEvent;
  FundingRateUpdatedEvent_filter: FundingRateUpdatedEvent_filter;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MarginChangedEvent: MarginChangedEvent;
  MarginChangedEvent_filter: MarginChangedEvent_filter;
  Position: Position;
  PositionChangedEvent: PositionChangedEvent;
  PositionChangedEvent_filter: PositionChangedEvent_filter;
  PositionLiquidatedEvent: PositionLiquidatedEvent;
  PositionLiquidatedEvent_filter: PositionLiquidatedEvent_filter;
  Position_filter: Position_filter;
  Query: {};
  RepegEvent: RepegEvent;
  RepegEvent_filter: RepegEvent_filter;
  String: Scalars['String'];
  Subscription: {};
  Trader: Trader;
  TraderDayData: TraderDayData;
  TraderDayData_filter: TraderDayData_filter;
  Trader_filter: Trader_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AmmResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Amm'] = ResolversParentTypes['Amm']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  positionBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterestSize?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterestNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tradingVolume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quoteAssetReserve?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  baseAssetReserve?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AmmPositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AmmPosition'] = ResolversParentTypes['AmmPosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  trader?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positionSize?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tradingVolume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  leverage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  entryPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realizedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unrealizedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fundingPayment?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  badDebt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidationPenalty?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPnlAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Candle'] = ResolversParentTypes['Candle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  close?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FundingPaymentEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FundingPaymentEvent'] = ResolversParentTypes['FundingPaymentEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  markPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  premiumFractionLong?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  premiumFractionShort?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  insuranceFundPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FundingRateUpdatedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FundingRateUpdatedEvent'] = ResolversParentTypes['FundingRateUpdatedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  fundingRateLong?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fundingRateShort?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  underlyingPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarginChangedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarginChangedEvent'] = ResolversParentTypes['MarginChangedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fundingPayment?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  trader?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tradingVolume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  leverage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realizedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unrealizedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fundingPayment?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  badDebt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidationPenalty?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPnlAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ammPositions?: Resolver<Array<ResolversTypes['AmmPosition']>, ParentType, ContextType, RequireFields<PositionammPositionsArgs, 'skip' | 'first'>>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionChangedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PositionChangedEvent'] = ResolversParentTypes['PositionChangedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  trader?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  exchangedPositionNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  exchangedPositionSize?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positionSizeAfter?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realizedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unrealizedPnlAfter?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  badDebt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidationPenalty?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  markPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fundingPayment?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionLiquidatedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PositionLiquidatedEvent'] = ResolversParentTypes['PositionLiquidatedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  trader?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  positionNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positionSize?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidationFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  badDebt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<QuerypositionArgs, 'id' | 'subgraphError'>>;
  positions?: Resolver<Array<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<QuerypositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ammPosition?: Resolver<Maybe<ResolversTypes['AmmPosition']>, ParentType, ContextType, RequireFields<QueryammPositionArgs, 'id' | 'subgraphError'>>;
  ammPositions?: Resolver<Array<ResolversTypes['AmmPosition']>, ParentType, ContextType, RequireFields<QueryammPositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  amm?: Resolver<Maybe<ResolversTypes['Amm']>, ParentType, ContextType, RequireFields<QueryammArgs, 'id' | 'subgraphError'>>;
  amms?: Resolver<Array<ResolversTypes['Amm']>, ParentType, ContextType, RequireFields<QueryammsArgs, 'skip' | 'first' | 'subgraphError'>>;
  positionChangedEvent?: Resolver<Maybe<ResolversTypes['PositionChangedEvent']>, ParentType, ContextType, RequireFields<QuerypositionChangedEventArgs, 'id' | 'subgraphError'>>;
  positionChangedEvents?: Resolver<Array<ResolversTypes['PositionChangedEvent']>, ParentType, ContextType, RequireFields<QuerypositionChangedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  positionLiquidatedEvent?: Resolver<Maybe<ResolversTypes['PositionLiquidatedEvent']>, ParentType, ContextType, RequireFields<QuerypositionLiquidatedEventArgs, 'id' | 'subgraphError'>>;
  positionLiquidatedEvents?: Resolver<Array<ResolversTypes['PositionLiquidatedEvent']>, ParentType, ContextType, RequireFields<QuerypositionLiquidatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  fundingRateUpdatedEvent?: Resolver<Maybe<ResolversTypes['FundingRateUpdatedEvent']>, ParentType, ContextType, RequireFields<QueryfundingRateUpdatedEventArgs, 'id' | 'subgraphError'>>;
  fundingRateUpdatedEvents?: Resolver<Array<ResolversTypes['FundingRateUpdatedEvent']>, ParentType, ContextType, RequireFields<QueryfundingRateUpdatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marginChangedEvent?: Resolver<Maybe<ResolversTypes['MarginChangedEvent']>, ParentType, ContextType, RequireFields<QuerymarginChangedEventArgs, 'id' | 'subgraphError'>>;
  marginChangedEvents?: Resolver<Array<ResolversTypes['MarginChangedEvent']>, ParentType, ContextType, RequireFields<QuerymarginChangedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  trader?: Resolver<Maybe<ResolversTypes['Trader']>, ParentType, ContextType, RequireFields<QuerytraderArgs, 'id' | 'subgraphError'>>;
  traders?: Resolver<Array<ResolversTypes['Trader']>, ParentType, ContextType, RequireFields<QuerytradersArgs, 'skip' | 'first' | 'subgraphError'>>;
  traderDayData?: Resolver<Maybe<ResolversTypes['TraderDayData']>, ParentType, ContextType, RequireFields<QuerytraderDayDataArgs, 'id' | 'subgraphError'>>;
  traderDayDatas?: Resolver<Array<ResolversTypes['TraderDayData']>, ParentType, ContextType, RequireFields<QuerytraderDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  candle?: Resolver<Maybe<ResolversTypes['Candle']>, ParentType, ContextType, RequireFields<QuerycandleArgs, 'id' | 'subgraphError'>>;
  candles?: Resolver<Array<ResolversTypes['Candle']>, ParentType, ContextType, RequireFields<QuerycandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  fundingPaymentEvent?: Resolver<Maybe<ResolversTypes['FundingPaymentEvent']>, ParentType, ContextType, RequireFields<QueryfundingPaymentEventArgs, 'id' | 'subgraphError'>>;
  fundingPaymentEvents?: Resolver<Array<ResolversTypes['FundingPaymentEvent']>, ParentType, ContextType, RequireFields<QueryfundingPaymentEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  repegEvent?: Resolver<Maybe<ResolversTypes['RepegEvent']>, ParentType, ContextType, RequireFields<QueryrepegEventArgs, 'id' | 'subgraphError'>>;
  repegEvents?: Resolver<Array<ResolversTypes['RepegEvent']>, ParentType, ContextType, RequireFields<QueryrepegEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RepegEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RepegEvent'] = ResolversParentTypes['RepegEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quoteAssetReserveBefore?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  baseAssetReserveBefore?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quoteAssetReserveAfter?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  baseAssetReserveAfter?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  repegPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  position?: SubscriptionResolver<Maybe<ResolversTypes['Position']>, "position", ParentType, ContextType, RequireFields<SubscriptionpositionArgs, 'id' | 'subgraphError'>>;
  positions?: SubscriptionResolver<Array<ResolversTypes['Position']>, "positions", ParentType, ContextType, RequireFields<SubscriptionpositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ammPosition?: SubscriptionResolver<Maybe<ResolversTypes['AmmPosition']>, "ammPosition", ParentType, ContextType, RequireFields<SubscriptionammPositionArgs, 'id' | 'subgraphError'>>;
  ammPositions?: SubscriptionResolver<Array<ResolversTypes['AmmPosition']>, "ammPositions", ParentType, ContextType, RequireFields<SubscriptionammPositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  amm?: SubscriptionResolver<Maybe<ResolversTypes['Amm']>, "amm", ParentType, ContextType, RequireFields<SubscriptionammArgs, 'id' | 'subgraphError'>>;
  amms?: SubscriptionResolver<Array<ResolversTypes['Amm']>, "amms", ParentType, ContextType, RequireFields<SubscriptionammsArgs, 'skip' | 'first' | 'subgraphError'>>;
  positionChangedEvent?: SubscriptionResolver<Maybe<ResolversTypes['PositionChangedEvent']>, "positionChangedEvent", ParentType, ContextType, RequireFields<SubscriptionpositionChangedEventArgs, 'id' | 'subgraphError'>>;
  positionChangedEvents?: SubscriptionResolver<Array<ResolversTypes['PositionChangedEvent']>, "positionChangedEvents", ParentType, ContextType, RequireFields<SubscriptionpositionChangedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  positionLiquidatedEvent?: SubscriptionResolver<Maybe<ResolversTypes['PositionLiquidatedEvent']>, "positionLiquidatedEvent", ParentType, ContextType, RequireFields<SubscriptionpositionLiquidatedEventArgs, 'id' | 'subgraphError'>>;
  positionLiquidatedEvents?: SubscriptionResolver<Array<ResolversTypes['PositionLiquidatedEvent']>, "positionLiquidatedEvents", ParentType, ContextType, RequireFields<SubscriptionpositionLiquidatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  fundingRateUpdatedEvent?: SubscriptionResolver<Maybe<ResolversTypes['FundingRateUpdatedEvent']>, "fundingRateUpdatedEvent", ParentType, ContextType, RequireFields<SubscriptionfundingRateUpdatedEventArgs, 'id' | 'subgraphError'>>;
  fundingRateUpdatedEvents?: SubscriptionResolver<Array<ResolversTypes['FundingRateUpdatedEvent']>, "fundingRateUpdatedEvents", ParentType, ContextType, RequireFields<SubscriptionfundingRateUpdatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marginChangedEvent?: SubscriptionResolver<Maybe<ResolversTypes['MarginChangedEvent']>, "marginChangedEvent", ParentType, ContextType, RequireFields<SubscriptionmarginChangedEventArgs, 'id' | 'subgraphError'>>;
  marginChangedEvents?: SubscriptionResolver<Array<ResolversTypes['MarginChangedEvent']>, "marginChangedEvents", ParentType, ContextType, RequireFields<SubscriptionmarginChangedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  trader?: SubscriptionResolver<Maybe<ResolversTypes['Trader']>, "trader", ParentType, ContextType, RequireFields<SubscriptiontraderArgs, 'id' | 'subgraphError'>>;
  traders?: SubscriptionResolver<Array<ResolversTypes['Trader']>, "traders", ParentType, ContextType, RequireFields<SubscriptiontradersArgs, 'skip' | 'first' | 'subgraphError'>>;
  traderDayData?: SubscriptionResolver<Maybe<ResolversTypes['TraderDayData']>, "traderDayData", ParentType, ContextType, RequireFields<SubscriptiontraderDayDataArgs, 'id' | 'subgraphError'>>;
  traderDayDatas?: SubscriptionResolver<Array<ResolversTypes['TraderDayData']>, "traderDayDatas", ParentType, ContextType, RequireFields<SubscriptiontraderDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  candle?: SubscriptionResolver<Maybe<ResolversTypes['Candle']>, "candle", ParentType, ContextType, RequireFields<SubscriptioncandleArgs, 'id' | 'subgraphError'>>;
  candles?: SubscriptionResolver<Array<ResolversTypes['Candle']>, "candles", ParentType, ContextType, RequireFields<SubscriptioncandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  fundingPaymentEvent?: SubscriptionResolver<Maybe<ResolversTypes['FundingPaymentEvent']>, "fundingPaymentEvent", ParentType, ContextType, RequireFields<SubscriptionfundingPaymentEventArgs, 'id' | 'subgraphError'>>;
  fundingPaymentEvents?: SubscriptionResolver<Array<ResolversTypes['FundingPaymentEvent']>, "fundingPaymentEvents", ParentType, ContextType, RequireFields<SubscriptionfundingPaymentEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  repegEvent?: SubscriptionResolver<Maybe<ResolversTypes['RepegEvent']>, "repegEvent", ParentType, ContextType, RequireFields<SubscriptionrepegEventArgs, 'id' | 'subgraphError'>>;
  repegEvents?: SubscriptionResolver<Array<ResolversTypes['RepegEvent']>, "repegEvents", ParentType, ContextType, RequireFields<SubscriptionrepegEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TraderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Trader'] = ResolversParentTypes['Trader']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  dayData?: Resolver<Maybe<Array<ResolversTypes['TraderDayData']>>, ParentType, ContextType, RequireFields<TraderdayDataArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TraderDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TraderDayData'] = ResolversParentTypes['TraderDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  trader?: Resolver<ResolversTypes['Trader'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tradingVolume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fundingPayment?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realizedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Amm?: AmmResolvers<ContextType>;
  AmmPosition?: AmmPositionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Candle?: CandleResolvers<ContextType>;
  FundingPaymentEvent?: FundingPaymentEventResolvers<ContextType>;
  FundingRateUpdatedEvent?: FundingRateUpdatedEventResolvers<ContextType>;
  MarginChangedEvent?: MarginChangedEventResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  PositionChangedEvent?: PositionChangedEventResolvers<ContextType>;
  PositionLiquidatedEvent?: PositionLiquidatedEventResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RepegEvent?: RepegEventResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Trader?: TraderResolvers<ContextType>;
  TraderDayData?: TraderDayDataResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = NftPerpTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/nftPerp/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const nftPerpTransforms = [];
const additionalTypeDefs = [] as any[];
const nftPerpHandler = new GraphqlHandler({
              name: "nftPerp",
              config: {"strategy":"fallback","sources":[{"endpoint":"https://api.thegraph.com/subgraphs/name/nftperp/beta"}]},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("nftPerp"),
              logger: logger.child("nftPerp"),
              importFn,
            });
sources[0] = {
          name: 'nftPerp',
          handler: nftPerpHandler,
          transforms: nftPerpTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));