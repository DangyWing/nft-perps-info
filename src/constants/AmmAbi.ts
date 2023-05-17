export const AmmABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "maxHoldingBaseAsset",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "openInterestNotionalCap",
        type: "uint256",
      },
    ],
    name: "CapChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "FeeRatioChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "FluctuationLimitRatioChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingPeriod",
        type: "uint256",
      },
    ],
    name: "FundingPeriodChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "fundingRateLong",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "fundingRateShort",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "underlyingPrice",
        type: "uint256",
      },
    ],
    name: "FundingRateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "InitMarginRatioChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "divergenceThresholdRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeInFavorRatio",
        type: "uint256",
      },
    ],
    name: "Level1DynamicFeeSettingsChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "divergenceThresholdRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeInFavorRatio",
        type: "uint256",
      },
    ],
    name: "Level2DynamicFeeSettingsChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "LiquidationFeeRatioChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "MaintenanceMarginRatioChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "open",
        type: "bool",
      },
    ],
    name: "Open",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "PartialLiquidationRatioChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
    ],
    name: "PriceFeedUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteAssetReserveBefore",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetReserveBefore",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteAssetReserveAfter",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetReserveAfter",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "repegPnl",
        type: "int256",
      },
    ],
    name: "Repeg",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteAssetReserve",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetReserve",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ReserveSnapshotted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum IAmm.Dir",
        name: "dir",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteAssetAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetAmount",
        type: "uint256",
      },
    ],
    name: "SwapInput",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum IAmm.Dir",
        name: "dir",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteAssetAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseAssetAmount",
        type: "uint256",
      },
    ],
    name: "SwapOutput",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256",
      },
    ],
    name: "TradeLimitRatioChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "_x0",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_y0",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseAssetDeltaThisFundingPeriod",
    outputs: [
      {
        internalType: "int256",
        name: "d",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseAssetReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfQuote",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetAmount",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "_isOpenPos",
        type: "bool",
      },
    ],
    name: "calcFee",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "fees",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_k",
        type: "tuple",
      },
    ],
    name: "calcKRepegPnl",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "repegPnl",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_repegTo",
        type: "tuple",
      },
    ],
    name: "calcPriceRepegPnl",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "repegPnl",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "counterParty",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cumulativeNotional",
    outputs: [
      {
        internalType: "int256",
        name: "d",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fluctuationLimitRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingBufferPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingRate",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "fundingRateLong",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "fundingRateShort",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseAssetDelta",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCumulativeNotional",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeRatio",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIndexPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInitMarginRatio",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfQuote",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetAmount",
        type: "tuple",
      },
    ],
    name: "getInputPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfQuote",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetAmount",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetPoolAmount",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetPoolAmount",
        type: "tuple",
      },
    ],
    name: "getInputPriceWithReserves",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfQuote",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetAmount",
        type: "tuple",
      },
    ],
    name: "getInputTwap",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLiquidationFeeRatio",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaintenanceMarginRatio",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMarkPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxHoldingBaseAsset",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOpenInterestNotionalCap",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfBase",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetAmount",
        type: "tuple",
      },
    ],
    name: "getOutputPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfBase",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetAmount",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetPoolAmount",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetPoolAmount",
        type: "tuple",
      },
    ],
    name: "getOutputPriceWithReserves",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfBase",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetAmount",
        type: "tuple",
      },
    ],
    name: "getOutputTwap",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPartialLiquidationRatio",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRatios",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "d",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "feeRatio",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "d",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "initMarginRatio",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "d",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "maintenanceMarginRatio",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "d",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "partialLiquidationRatio",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "d",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "liquidationFeeRatio",
            type: "tuple",
          },
        ],
        internalType: "struct IAmm.Ratios",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSnapshotLen",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_intervalInSeconds",
        type: "uint256",
      },
    ],
    name: "getTwapPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_quoteAssetReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_baseAssetReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tradeLimitRatio",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fundingPeriod",
        type: "uint256",
      },
      {
        internalType: "contract IPriceFeed",
        name: "_priceFeed",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_priceFeedKey",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_quoteAsset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_fluctuationLimitRatio",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeRatio",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfBase",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetAmount",
        type: "tuple",
      },
    ],
    name: "isOverFluctuationLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOverSpreadLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "k",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastRepegTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "level1DynamicFeeSettings",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "divergenceThresholdRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "feeRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "feeInFavorRatio",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "level2DynamicFeeSettings",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "divergenceThresholdRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "feeRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "feeInFavorRatio",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "markPriceTwapInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextFundingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "open",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      {
        internalType: "contract IPriceFeed",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeedKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "quoteAsset",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "quoteAssetReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "repegBufferPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_multiplier",
        type: "tuple",
      },
    ],
    name: "repegK",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "repegPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "reserveSnapshots",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "quoteAssetReserve",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "baseAssetReserve",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_maxHoldingBaseAsset",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_openInterestNotionalCap",
        type: "tuple",
      },
    ],
    name: "setCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_counterParty",
        type: "address",
      },
    ],
    name: "setCounterParty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_feeRatio",
        type: "tuple",
      },
    ],
    name: "setFeeRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_fluctuationLimitRatio",
        type: "tuple",
      },
    ],
    name: "setFluctuationLimitRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fundingPeriod",
        type: "uint256",
      },
    ],
    name: "setFundingPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_initMarginRatio",
        type: "tuple",
      },
    ],
    name: "setInitMarginRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_divergenceThresholdRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_feeRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_feeInFavorRatio",
        type: "tuple",
      },
    ],
    name: "setLevel1DynamicFeeSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_divergenceThresholdRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_feeRatio",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_feeInFavorRatio",
        type: "tuple",
      },
    ],
    name: "setLevel2DynamicFeeSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_liquidationFeeRatio",
        type: "tuple",
      },
    ],
    name: "setLiquidationFeeRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_maintenanceMarginRatio",
        type: "tuple",
      },
    ],
    name: "setMaintenanceMarginRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_interval",
        type: "uint256",
      },
    ],
    name: "setMarkPriceTwapInterval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_open",
        type: "bool",
      },
    ],
    name: "setOpen",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_partialLiquidationRatio",
        type: "tuple",
      },
    ],
    name: "setPartialLiquidationRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPriceFeed",
        name: "_priceFeed",
        type: "address",
      },
    ],
    name: "setPriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_repegBufferPeriod",
        type: "uint256",
      },
    ],
    name: "setRepegBufferPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_tradeLimitRatio",
        type: "tuple",
      },
    ],
    name: "setTradeLimitRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleFunding",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "premiumFraction",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "markPrice",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "indexPrice",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfQuote",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetAmount",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetAmountLimit",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "_canOverFluctuationLimit",
        type: "bool",
      },
    ],
    name: "swapInput",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IAmm.Dir",
        name: "_dirOfBase",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_baseAssetAmount",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_quoteAssetAmountLimit",
        type: "tuple",
      },
    ],
    name: "swapOutput",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPositionSize",
    outputs: [
      {
        internalType: "int256",
        name: "d",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tradeLimitRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "_premiumFractionLong",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "d",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "_premiumFractionShort",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "_underlyingPrice",
        type: "tuple",
      },
    ],
    name: "updateFundingRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
