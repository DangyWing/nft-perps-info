export const ClearingHouseAbi = [
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "trader",
        type: "address",
      },
    ],
    name: "isLiquidatable",
    outputs: [
      {
        internalType: "bool",
        name: "isLiquidatable",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "amm",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "markPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "indexPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "premiumFractionLong",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "premiumFractionShort",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "insuranceFundPnl",
        type: "int256",
      },
    ],
    name: "FundingPayment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "amm",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "fundingPayment",
        type: "int256",
      },
    ],
    name: "MarginChanged",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "amm",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "margin",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "exchangedPositionNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "exchangedPositionSize",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "positionSizeAfter",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "realizedPnl",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "unrealizedPnlAfter",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "badDebt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidationPenalty",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "markPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "fundingPayment",
        type: "int256",
      },
    ],
    name: "PositionChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "amm",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidatedPositionNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidatedPositionSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidationReward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "insuranceFundProfit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "badDebt",
        type: "uint256",
      },
    ],
    name: "PositionLiquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "amm",
        type: "address",
      },
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
      {
        indexed: false,
        internalType: "uint256",
        name: "repegDebt",
        type: "uint256",
      },
    ],
    name: "Repeg",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "amm",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bot",
        type: "address",
      },
    ],
    name: "RepegBotSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
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
        name: "_addedMargin",
        type: "tuple",
      },
    ],
    name: "addMargin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
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
    name: "closePosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cumulativePremiumFractionLong",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cumulativePremiumFractionShort",
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
    name: "fundingRateDeltaCapRatio",
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
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
    ],
    name: "getLatestCumulativePremiumFraction",
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
        name: "latestCumulativePremiumFractionLong",
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
        name: "latestCumulativePremiumFractionShort",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "_trader",
        type: "address",
      },
    ],
    name: "getMarginRatio",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "marginRatio",
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
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "_trader",
        type: "address",
      },
    ],
    name: "getPosition",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "int256",
                name: "size",
                type: "int256",
              },
            ],
            internalType: "struct SignedDecimal.signedDecimal",
            name: "size",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "margin",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "margin",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "openNotional",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.decimal",
            name: "openNotional",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "int256",
                name: "lastUpdatedCumulativePremiumFractionLong",
                type: "int256",
              },
            ],
            internalType: "struct SignedDecimal.signedDecimal",
            name: "lastUpdatedCumulativePremiumFractionLong",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "int256",
                name: "lastUpdatedCumulativePremiumFractionShort",
                type: "int256",
              },
            ],
            internalType: "struct SignedDecimal.signedDecimal",
            name: "lastUpdatedCumulativePremiumFractionShort",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        internalType: "struct ClearingHouse.Position",
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
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "_trader",
        type: "address",
      },
      {
        internalType: "enum ClearingHouse.PnlCalcOption",
        name: "_pnlCalcOption",
        type: "uint8",
      },
    ],
    name: "getPositionNotionalAndUnrealizedPnl",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "positionNotional",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "positionNotional",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "unrealizedPnl",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "unrealizedPnl",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IInsuranceFund",
        name: "_insuranceFund",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_fundingRateDeltaCapRatio",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "insuranceFund",
    outputs: [
      {
        internalType: "contract IInsuranceFund",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "_trader",
        type: "address",
      },
    ],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "openInterestNotionalMap",
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
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "enum ClearingHouse.Side",
        name: "_side",
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
        name: "_leverage",
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
    ],
    name: "openPosition",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
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
        name: "_partialCloseRatio",
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
    name: "partialClose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "positionMap",
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
        name: "size",
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
        name: "margin",
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
        name: "openNotional",
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
        name: "lastUpdatedCumulativePremiumFractionLong",
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
        name: "lastUpdatedCumulativePremiumFractionShort",
        type: "tuple",
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
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
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
        name: "_removedMargin",
        type: "tuple",
      },
    ],
    name: "removeMargin",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "repegBots",
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
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
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
        name: "_multiplier",
        type: "tuple",
      },
    ],
    name: "repegLiquidityDepth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
    ],
    name: "repegPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "_repegBot",
        type: "address",
      },
    ],
    name: "setRepegBot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAmm",
        name: "_amm",
        type: "address",
      },
    ],
    name: "settleFunding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tollMap",
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
        name: "",
        type: "address",
      },
    ],
    name: "totalPositionSizeMap",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "netPositionSize",
            type: "int256",
          },
        ],
        internalType: "struct SignedDecimal.signedDecimal",
        name: "netPositionSize",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "positionSizeLong",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "positionSizeLong",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "positionSizeShort",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.decimal",
        name: "positionSizeShort",
        type: "tuple",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
