import {
  usePrepareContractWrite,
  useContractWrite,
  type Address,
  useWaitForTransaction,
} from "wagmi";
import { ClearingHouseAddress } from "~/constants/constants";
import { ClearingHouseAbi } from "~/constants/ClearingHouseABI";
import { getSlippageBaseAssetAmount } from "~/utils/getSlippageBaseAssetAmount";
import { arbitrum } from "viem/chains";
import { parseEther } from "viem";
import { toast } from "~/components/ui/use-toast";

export function OpenPositionTx({
  ammName,
  ammAddress,
  wethAmount,
  slippage,
  walletAddress,
  side,
  leverage,
  outputSize,
}: {
  ammName: string;
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

  const { data, isLoading, isSuccess, write, status } =
    useContractWrite(config);

  const {
    data: dataWaitForTx,
    isError: isErrorWaitForTx,
    isLoading: isLoadingWaitForTx,
    isSuccess: isSuccessWaitForTx,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      const txHash = dataWaitForTx?.transactionHash ?? "0x0";

      toast({
        title: "Tx Success",
        description: (
          <div>
            {ammName} - {side} - {wethAmount.toFixed(2)} WETH
            <a href={`https://arbiscan.io/tx/${txHash}`} target="_blank">
              {txHash.slice(0, 5)}...{txHash.slice(-5)}
            </a>
          </div>
        ),
        duration: 3_000,
        variant: "default",
      });
    },
  });

  return {
    write,
    data,
    isLoading,
    isSuccess,
    error,
    txHash: data?.hash,
    dataWaitForTx,
    isErrorWaitForTx,
    isLoadingWaitForTx,
    isSuccessWaitForTx,
    status,
  };
}
