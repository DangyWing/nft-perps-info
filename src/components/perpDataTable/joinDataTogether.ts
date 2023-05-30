import { type PerpData } from "~/types";
import { type AllPositionsReturnType } from "~/app/lib/directFromContract/getAllPositionsForWallet";
import { type Object } from "ts-toolbelt";

type PerpDataWithUserStatus = Object.Merge<
  PerpData,
  { userStatus?: "long" | "short" | undefined }
>;

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
        };
      }
    });
  }
}
