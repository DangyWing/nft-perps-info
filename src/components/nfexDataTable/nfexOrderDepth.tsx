import { useQuery } from "@tanstack/react-query";
import { getNfexPairOrderDepth } from "~/app/lib/nfexDataFetching/getNfexOrderDepth";

export function NfexOrderDepth({ symbolId }: { symbolId: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`nfexOrderDepth`, symbolId],
    queryFn: () => getNfexPairOrderDepth({ symbolId }),
  });

  if (!data) return <div>NO DATA</div>;

  const highestBid = data.highestBid;
  const lowestAsk = data.lowestAsk;

  if (isLoading) return <div>LOADING</div>;
  if (!!error) return <div>ERROR</div>;
  if (!highestBid || !lowestAsk) return <div>NO DATA</div>;

  return (
    <div className="flex flex-col justify-evenly divide-y divide-white">
      <div>
        {lowestAsk.price.length > 4
          ? lowestAsk.price
          : lowestAsk.price.padEnd(5, "C")}{" "}
        |{" "}
        {(parseFloat(lowestAsk.price) * parseFloat(lowestAsk.size)).toFixed(2)}
      </div>
      <div>
        {highestBid.price.length > 4
          ? highestBid.price
          : highestBid.price.padEnd(5, "0")}{" "}
        |{" "}
        {(parseFloat(highestBid.price) * parseFloat(highestBid.size)).toFixed(
          2
        )}
      </div>
    </div>
  );
}
