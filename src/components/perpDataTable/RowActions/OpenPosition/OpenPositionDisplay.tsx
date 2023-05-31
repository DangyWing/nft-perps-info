import { LoadingBlocks } from "~/components/loading";
import type { OpenPositionSummaryResponse } from "~/app/lib/getOpenPositionSummary";

export function OpenPositionDisplay({
  openPositionData,
  isLoading,
  isError,
  enabled,
}: {
  openPositionData: OpenPositionSummaryResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetched: boolean;
  enabled: boolean;
}) {
  if (!enabled) return null;
  if (isLoading) return <LoadingBlocks />;
  if (isError) return <div>Failed to fetch close position summary</div>;
  const data = openPositionData?.data;

  if (!data) return <div>... oops</div>;

  const feeStatus = !!data.surgeFee
    ? "Surge"
    : !!data.loweredFee
    ? "Lowered"
    : "";

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
