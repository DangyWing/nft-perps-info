import { AccountPositions } from "~/components/accountPositions/accountPositions";

import { Suspense } from "react";

export const metadata = {
  title: "NFT Perps Info",
  description: "Shows you the data you need for NFT Perps",
};

export default function Page() {
  return (
    <div>
      {" "}
      <Suspense fallback={<div>Loading...</div>}>
        <AccountPositions />
      </Suspense>
    </div>
  );
}
