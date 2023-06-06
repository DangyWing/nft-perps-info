import { LoadingBlocks } from "~/components/Loading";
import type { OpenPositionSummaryResponse } from "~/app/lib/getOpenPositionSummary";
import { type TransactionReceipt } from "viem";

export function OpenPositionDisplay({
  openPositionData,
  isLoading,
  isError,
  enabled,
  dataWaitForTx,
}: {
  openPositionData: OpenPositionSummaryResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetched: boolean;
  enabled: boolean;
  dataWaitForTx: TransactionReceipt | undefined;
}) {
  if (!enabled) return null;
  if (isLoading) return <LoadingBlocks className="fill-primary-foreground" />;
  if (isError) return <div>Failed to fetch close position summary</div>;
  const data = openPositionData?.data;

  if (!data) return <div>... oops</div>;

  const feeStatus = !!data.surgeFee
    ? "Surge"
    : !!data.loweredFee
    ? "Lowered"
    : "";

  if (dataWaitForTx?.status === "success") return <div>Success</div>;
  if (dataWaitForTx?.status === "reverted") return <div>Reverted</div>;

  return (
    <div>
      <div>entry price: {parseFloat(data.entryPrice).toFixed(2)}</div>
      <div>total cost: {parseFloat(data.totalCost).toFixed(3)}</div>
      <div>fee: {parseFloat(data.fee).toFixed(4)}</div>
      {/* liq price seems wrong from the api but whatever */}
      {/* <div>liq price: {parseFloat(data.liquidationPrice).toFixed(3)} </div> */}
      {/* <div>price impact: {parseFloat(data.priceImpact).toFixed(3)}%</div> */}
      <div>fee status: {feeStatus}</div>
    </div>
  );
}
