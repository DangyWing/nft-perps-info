import {
  usePrepareContractWrite,
  useContractWrite,
  type Address,
  useWaitForTransaction,
} from "wagmi";
import { ClearingHouseAddress } from "~/constants/constants";
import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { calcSlippageQuoteAssetAmount } from "~/utils/calcSlippageQuoteAssetAmount";
import { arbitrum } from "viem/chains";
import { parseEther } from "viem";

export function ClosePositionTx({
  ammAddress,
  outputNotional,
  slippage,
  percentToClose,
  walletAddress,
  side,
}: {
  ammAddress: Address;
  outputNotional: string | undefined;
  slippage: string | number;
  percentToClose: number;
  walletAddress: Address;
  side: "long" | "short";
}) {
  const quoteAssetAmountLimit = calcSlippageQuoteAssetAmount(
    side,
    outputNotional as `${number}` | undefined,
    slippage
  );

  const isError = quoteAssetAmountLimit instanceof Error;

  const quoteAssetAmountLimitParsed = isError
    ? BigInt(0)
    : quoteAssetAmountLimit;

  const { config: fullClosePositionConfig, error: fullCloseError } =
    usePrepareContractWrite({
      address: ClearingHouseAddress,
      abi: ClearingHouseAbi,
      functionName: "closePosition",
      args: [ammAddress, { d: quoteAssetAmountLimitParsed }],

      account: walletAddress,
      enabled: !isError && percentToClose === 100,
      chainId: arbitrum.id,
    });

  const { config: partialClosePositionConfig, error: partialCloseError } =
    usePrepareContractWrite({
      address: ClearingHouseAddress,
      abi: ClearingHouseAbi,
      functionName: "partialClose",
      args: [
        ammAddress,
        { d: parseEther((percentToClose / 100).toString() as `${number}`) },
        { d: quoteAssetAmountLimitParsed },
      ],
      enabled: !isError && percentToClose < 100 && percentToClose > 0,
      chainId: arbitrum.id,
    });

  const config =
    percentToClose === 100
      ? fullClosePositionConfig
      : partialClosePositionConfig;

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const { data: dataWaitForTx } = useWaitForTransaction({
    hash: data?.hash,
  });

  const error = fullCloseError ?? partialCloseError;
  return { write, data, isLoading, isSuccess, error, dataWaitForTx };
}
