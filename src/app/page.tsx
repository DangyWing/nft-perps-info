import type { NfexResponse } from "types";
import { PerpData } from "../components/perpData";
import * as React from "react";

export const metadata = {
  title: "NFT Perps Info",
  description: "Shows you the data you need for NFT Perps",
  // favicon: "/favicon.ico",
};

export default async function Page() {
  // const [foo, setFoo] = React.useState(null);

  const res = await fetch("https://apigw.nfex.io/market/pairs", {
    next: {
      revalidate: 5,
    },
  });

  const { data, errno, msg } = (await res.json()) as NfexResponse;

  if (errno !== "200")
    return (
      <div>
        <h1>{msg}</h1>
      </div>
    );

  return (
    <div>
      <PerpData data={data} />
    </div>
  );
}
