export const ClearingHouseViewerABI = [
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
        internalType: "boolean",
        name: "isLiquidatable",
        type: "boolean",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ClearingHouse",
        name: "_clearingHouse",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "clearingHouse",
    outputs: [
      {
        internalType: "contract ClearingHouse",
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
    name: "getFreeCollateral",
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
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_quoteToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_trader",
        type: "address",
      },
    ],
    name: "getPersonalBalanceWithFundingPayment",
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
        name: "margin",
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
    name: "getPersonalPositionWithFundingPayment",
    outputs: [
      {
        components: [
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
        internalType: "struct ClearingHouse.Position",
        name: "position",
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
    name: "getUnrealizedPnl",
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
] as const;
