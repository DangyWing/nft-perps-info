import { type Address } from "viem";
import { LoadingBlocks } from "~/components/loading";
import type { ClosePositionSummaryResponse } from "~/app/lib/getClosePositionSummary";

export function ClosePositionDisplay({
  closePositionData,
  isLoading,
  isError,
  isFetched,
}: {
  closePositionData: ClosePositionSummaryResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetched: boolean;
  ammAddress: Address;
  ammName: string;
  walletAddress: Address;
  closePercent: number;
}) {
  if (isLoading) return <LoadingBlocks />;
  if (isError) return <div>Failed to fetch close position summary</div>;

  const data = closePositionData?.data;
  if (!data) return <div>... oops</div>;

  const outputInEth =
    parseFloat(data.outputMargin) - parseFloat(data.fee) + parseFloat(data.pnl);

  if (isFetched) {
    return (
      <div>
        <div>Est out: {outputInEth.toFixed(4)} Ξ</div>
        <div>pnl: {parseFloat(data.pnl).toFixed(2)}</div>
        <div>exit price: {parseFloat(data.exitPrice).toFixed(3)}</div>
        <div>fee: {parseFloat(data.fee).toFixed(2)} Ξ</div>
        <div>price impact: {parseFloat(data.priceImpact).toFixed(2)}%</div>
        {/*THIS IS WRONG BUT FROM THE API */}
        {/* <div>liq price: {parseFloat(data.liquidationPrice).toFixed(3)}</div> */}
      </div>
    );
  }
}
