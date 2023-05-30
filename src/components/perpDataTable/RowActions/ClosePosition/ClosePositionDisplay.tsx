import { type Address } from "viem";
import { getNftPerpAmmNameFromContractAddress } from "~/utils/fetchFromConstant/getNftPerpAmmNameFromContractAddress";
import { getClosePositionSummary } from "~/app/lib/getClosePositionSummary";
import { useQuery } from "@tanstack/react-query";
import { LoadingBlocks } from "~/components/loading";

export function ClosePositionDisplay({
  ammAddress,
  walletAddress,
  closePercent,
  slippage,
}: {
  ammAddress: Address;
  ammName: string;
  walletAddress: Address;
  closePercent: number;
  slippage: string | number;
}) {
  const ammName = getNftPerpAmmNameFromContractAddress(ammAddress);

  const {
    data: closePositionData,
    isError,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["closePositionSummary"],
    refetchInterval: 60_000,
    queryFn: () =>
      getClosePositionSummary({ ammName, walletAddress, closePercent }),
  });

  if (isLoading) return <LoadingBlocks />;
  if (isError) return <div>Failed to fetch close position summary</div>;

  const data = closePositionData.data;

  const slippageClean = typeof slippage === "string" ? 0 : slippage;

  if (isFetched) {
    return (
      <div>
        <div>Output Notional: {parseFloat(data.outputNotional).toFixed(3)}</div>
        <div>exit price: {parseFloat(data.exitPrice).toFixed(3)}</div>
        <div>fee: {parseFloat(data.fee).toFixed(2)}</div>
        <div>pnl: {parseFloat(data.pnl).toFixed(2)}</div>
        <div>price impact: {parseFloat(data.priceImpact).toFixed(2)}%</div>
        <div>output margin: {parseFloat(data.outputMargin).toFixed(2)}</div>
        <div>forced partial close: {data.forcedPartialClose.toString()}</div>
        <div>liq price: {data.liquidationPrice}</div>
        {/* <div>Close %: {closePercent}</div> */}
        <div>Slip %: {slippageClean}</div>
      </div>
    );
  }
}
