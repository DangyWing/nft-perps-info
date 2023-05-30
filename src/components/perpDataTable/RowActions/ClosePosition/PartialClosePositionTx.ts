import { usePrepareContractWrite, useContractWrite, type Address } from "wagmi";
import { ClearingHouseAddress } from "~/constants/constants";
import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { calcSlippageQuoteAssetAmount } from "~/utils/calcSlippageQuoteAssetAmount";

export function PartialClosePositionTx({
  ammAddress,
  outputNotional,
  slippage,
  closePercent,
}: {
  ammAddress: Address;
  outputNotional: string | undefined;
  slippage: string | number;
  closePercent: bigint;
}) {
  const quoteAssetAmountLimit = calcSlippageQuoteAssetAmount(
    "long",
    outputNotional as `${number}` | undefined,
    slippage
  );

  const isError = quoteAssetAmountLimit instanceof Error;
  const quoteAssetAmountLimitParsed = isError
    ? BigInt(0)
    : quoteAssetAmountLimit;

  const { config, error } = usePrepareContractWrite({
    address: ClearingHouseAddress,
    abi: ClearingHouseAbi,
    functionName: "closePosition",
    args: [ammAddress, { d: quoteAssetAmountLimitParsed }],
    enabled: !isError,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { write, data, isLoading, isSuccess, error };
}
