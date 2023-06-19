import type { PerpData, PerpDataWithUserStatus } from "~/types";
import { type AllPositionsReturnType } from "~/app/lib/directFromContract/getAllPositionsForWallet";

export function joinDataTogether(
  perpData: PerpData[],
  walletPositions: AllPositionsReturnType[] | undefined
): PerpDataWithUserStatus[] {
  if (!walletPositions || walletPositions.length === 0) {
    return perpData.map((perp) => {
      return {
        ...perp,
        userStatus: undefined,
      };
    });
  } else {
    return perpData.map((perp) => {
      const userStatus = walletPositions.find(
        (position) => position.ammAddress === perp.nftPerpAmmAddress
      );

      if (!userStatus) {
        return {
          ...perp,
          userStatus: undefined,
        };
      } else {
        return {
          ...perp,
          userStatus: parseFloat(userStatus.size) > 0 ? "long" : "short",
          uPnl: userStatus.unrealizedPnl,
        };
      }
    });
  }
}
