import { isAddress } from "viem";
import { getAddress } from "viem";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ClearingHouseAbi } from "~/utils/nftPerpAbis";
import { getContractAddressFromAmmName } from "~/utils/getContractAddressFromAmmName";

export function LiqButton({
  traderAddress,
  ammName,
  isLiquidatable,
}: {
  traderAddress: string;
  ammName: string;
  isLiquidatable: boolean;
}) {
  const contractAddress = getContractAddressFromAmmName(ammName);

  const validAddresses = isAddress(traderAddress) && isAddress(contractAddress);

  const { config, isSuccess } = usePrepareContractWrite({
    address: "0x6fc05B7DFe545cd488E9D47d56CFaCA88F69A2e1",
    abi: ClearingHouseAbi,
    functionName: "liquidate",
    args: [contractAddress, getAddress(traderAddress)],
    enabled: validAddresses && isLiquidatable,
  });

  const { write } = useContractWrite(config);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={!isSuccess}>
          {isSuccess ? "👅" : "🚫"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are really gonna liq this guy?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => write?.()}>
            liq em
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
