import { isAddress } from "viem";
import { getAddress } from "viem";
import { useAccount } from "wagmi";

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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ClearingHouseAbi } from "~/utils/nftPerpAbis";
import { getContractAddressFromAmmName } from "~/utils/getContractAddressFromAmmName";

export function LongButton({ ammName }: { ammName: string }) {
  const contractAddress = getContractAddressFromAmmName(ammName);

  const validAddresses = isAddress(contractAddress);

  // const { config, isSuccess } = usePrepareContractWrite({
  //   address: "0x6fc05B7DFe545cd488E9D47d56CFaCA88F69A2e1",
  //   abi: ClearingHouseAbi,
  //   functionName: "liquidate",
  //   args: [contractAddress, getAddress(traderAddress)],
  //   enabled: validAddresses,
  // });

  // const { write } = useContractWrite(config);

  const isSuccess = true;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={!isSuccess}>
          {isSuccess ? "👅" : "🚫"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>p
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are really gonna liq this guy?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction onClick={() => write?.()}> */}
          <AlertDialogAction>liq em</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
