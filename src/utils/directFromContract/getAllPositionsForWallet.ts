import { AMMData } from "~/constants/constants";
import { publicClient } from "../viemClient";
import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { ClearingHouseAddress } from "~/constants/constants";
import { formatEther, type Address } from "viem";
import { cache } from "react";

type GetPositionResult = {
  size: {
    size: bigint;
  };
  margin: {
    margin: bigint;
  };
  openNotional: {
    openNotional: bigint;
  };
  blockNumber: bigint;
};

type GetPositionNotionalAndUnrealizedPnlResult = [
  positionNotional: {
    positionNotional: bigint;
  },
  unrealizedPnl: {
    unrealizedPnl: bigint;
  }
];

export type ResultType<T> =
  | {
      error: Error;
      result: undefined;
      status: "failure";
      ammAddress: Address;
    }
  | {
      error: undefined;
      result: T;
      status: "success";
      ammAddress: Address;
    };

type GetMarginRatioResult = {
  marginRatio: bigint;
};

type SingleAmmData = (typeof AMMData)[0];

function getContracts({
  singleAmmData,
  walletAddress,
}: {
  singleAmmData: SingleAmmData;
  walletAddress: Address;
}) {
  return [
    "getPosition",
    "getPositionNotionalAndUnrealizedPnl",
    "getMarginRatio",
  ].map((functionName) => {
    return {
      address: ClearingHouseAddress,
      abi: ClearingHouseAbi,
      functionName: functionName,
      args:
        functionName === "getPositionNotionalAndUnrealizedPnl"
          ? [singleAmmData.nftPerpAmmAddress, walletAddress, BigInt(0)]
          : [singleAmmData.nftPerpAmmAddress, walletAddress],
    };
  });
}

export const getSingleAmmPositionForWallet = async ({
  walletAddress,
  singleAmm,
}: {
  walletAddress: Address;
  singleAmm: SingleAmmData;
}) => {
  const contracts = getContracts({
    singleAmmData: singleAmm,
    walletAddress: walletAddress,
  });

  type MulticallResult = [
    ResultType<GetPositionResult>,
    ResultType<GetPositionNotionalAndUnrealizedPnlResult>,
    ResultType<GetMarginRatioResult>
  ];

  const [
    getPositionResult,
    getPositionNotionalAndUnrealizedPnlResult,
    getMarginRatioResult,
  ] = (await publicClient.multicall({
    contracts: contracts,
  })) as MulticallResult;

  return {
    position: getPositionResult,
    positionNotionalAndUnrealizedPnl: getPositionNotionalAndUnrealizedPnlResult,
    marginRatio: getMarginRatioResult,
    ...singleAmm,
    walletAddress: walletAddress,
  };
};
export type AllPositionsReturnType = {
  walletAddress: `0x${string}`;
  ammName: string;
  nfexProjectName: string;
  maxLeverage: number;
  ammAddress: Address;
  blockNumber: string;
  size: string;
  margin: string;
  openNotional: string;
  positionNotional: string;
  unrealizedPnl: string;
  marginRatio: string;
};

export async function getAllPositionsForWallet({
  walletAddress,
}: {
  walletAddress: Address | undefined;
}) {
  if (!walletAddress) return [];
  const res = await Promise.all(
    AMMData.map(async (singleAmm) => {
      return await getSingleAmmPositionForWallet({
        walletAddress: walletAddress,
        singleAmm: singleAmm,
      });
    })
  );

  return res
    .map((singleRes) => {
      if (
        singleRes.position.result &&
        singleRes.positionNotionalAndUnrealizedPnl.result &&
        singleRes.marginRatio.result
      ) {
        const {
          blockNumber,
          size: { size },
          margin: { margin },
          openNotional: { openNotional },
        } = singleRes.position.result;

        const [{ positionNotional }, { unrealizedPnl }] =
          singleRes.positionNotionalAndUnrealizedPnl.result;

        const { marginRatio } = singleRes.marginRatio.result;

        return {
          ammName: singleRes.ammName,
          ammAddress: singleRes.nftPerpAmmAddress,
          maxLeverage: singleRes.maxLeverage,
          blockNumber: blockNumber.toString(),
          size: formatEther(size),
          margin: formatEther(margin),
          openNotional: formatEther(openNotional),
          positionNotional: parseFloat(formatEther(positionNotional)).toFixed(
            2
          ),
          unrealizedPnl: parseFloat(formatEther(unrealizedPnl)).toFixed(4),
          marginRatio: parseFloat(formatEther(marginRatio)).toFixed(3),
        };
      }
    })
    .filter((item): item is AllPositionsReturnType => !!item);
}
