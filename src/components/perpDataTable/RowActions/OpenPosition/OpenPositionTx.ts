import { usePrepareContractWrite, useContractWrite, type Address } from "wagmi";
import { ClearingHouseAddress } from "~/constants/constants";
import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { getSlippageBaseAssetAmount } from "~/utils/getSlippageBaseAssetAmount";
import { arbitrum } from "viem/chains";
import { parseEther } from "viem";

export function OpenPositionTx({
  ammAddress,
  wethAmount,
  slippage,
  walletAddress,
  side,
  leverage,
  outputSize,
}: {
  ammAddress: Address;
  wethAmount: number;
  slippage: string | number;
  walletAddress: Address;
  side: "long" | "short";
  leverage: number;
  outputSize: `${number}` | undefined;
}) {
  const slippageBaseAmount = getSlippageBaseAssetAmount(
    side,
    outputSize,
    slippage
  );

  // console.log("WETH AMT: ", wethAmount);

  const isSlippageBaseAmountError = slippageBaseAmount instanceof Error;

  const { config, error } = usePrepareContractWrite({
    address: ClearingHouseAddress,
    abi: ClearingHouseAbi,
    functionName: "openPosition",
    args: [
      ammAddress,
      side === "long" ? 0 : 1,
      { d: parseEther(wethAmount.toString() as `${number}`) },
      { d: parseEther(`${leverage ?? 0}`) },
      { d: isSlippageBaseAmountError ? BigInt(0) : slippageBaseAmount },
    ],
    account: walletAddress,
    enabled: !isSlippageBaseAmountError,
    chainId: arbitrum.id,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { write, data, isLoading, isSuccess, error };
}
