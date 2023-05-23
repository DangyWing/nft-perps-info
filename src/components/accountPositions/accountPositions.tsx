"use client";

import { getAllPositionsForWallet } from "~/utils/directFromContract/getAllPositionsForWallet";
import { PositionCard } from "../PositionCard";
import { useEffect, useState } from "react";
import type { AllPositionsReturnType } from "~/utils/directFromContract/getAllPositionsForWallet";
import { useAccount } from "wagmi";

export const AccountPositions = () => {
  const { address } = useAccount();

  const [positionData, setPositionData] = useState<AllPositionsReturnType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const positionData = await getAllPositionsForWallet({
        walletAddress: address,
      });

      setPositionData(positionData);
    };

    fetchData().catch((e) => {
      console.error(e);
    });
  }, [address]);

  return (
    <div>
      <h1>Account Positions: {address}</h1>
      <div className="grid grid-cols-2 gap-2">
        {positionData.map((position, index) => {
          return <PositionCard key={index} ammData={position} />;
        })}
      </div>
    </div>
  );
};
