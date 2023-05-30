import { type Address } from "viem";
import { getNftPerpAmmNameFromContractAddress } from "~/utils/fetchFromConstant/getNftPerpAmmNameFromContractAddress";
import { getClosePositionSummary } from "~/app/lib/getClosePositionSummary";
import { useQuery } from "@tanstack/react-query";

export function ClosePositionDisplay({
  ammAddress,
  walletAddress,
  closePercent,
}: {
  ammAddress: Address;
  ammName: string;
  walletAddress: Address;
  closePercent: number;
}) {
  const ammName = getNftPerpAmmNameFromContractAddress(ammAddress);

  const {
    data: returnedData,
    isError,
    isFetched,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["closePositionSummary"],
    refetchInterval: 1000,
    queryFn: () =>
      getClosePositionSummary({ ammName, walletAddress, closePercent }),
  });

  if (!returnedData) return <div>Failed to fetch close position summary</div>;

  const { data, status } = returnedData;

  /* 
  Price Impact
0.4844 %
Exit Price
47.98 WETH
Margin
0.8256 WETH
PNL
-0.1571 WETH
Fee
-0.0244 ETH
Estimated Output
0.644 WETH
*/

  /* 
Output Notional: 8.157
exit price: 47.98185455195093953778
fee: 0.02447145900510065424477
pnl: -0.15715300170021808159
price impact: 48.45%
output margin: 0.82666906258866308309
forced partial close: false
fee ratio: 0.003
liq price: 0
*/

  const content = (
    <div>
      <div>Output Notional: {parseFloat(data.outputNotional).toFixed(3)}</div>
      <div>exit price: {data.exitPrice}</div>
      <div>fee: {data.fee}</div>
      <div>pnl: {data.pnl}</div>
      <div>price impact: {parseFloat(data.priceImpact).toFixed(2)}%</div>
      <div>output margin: {data.outputMargin}</div>
      <div>forced partial close: {data.forcedPartialClose.toString()}</div>
      <div>fee ratio: {data.feeRatio}</div>
      <div>liq price: {data.liquidationPrice}</div>
    </div>
  );

  return content;

  // if (status !== "success") {
  //   return <div>Failed to fetch close position summary</div>;
  // }
  // const a = data.outputNotional;

  // return <div>{a}</div>;
  // return <div>CAT</div>;
}
