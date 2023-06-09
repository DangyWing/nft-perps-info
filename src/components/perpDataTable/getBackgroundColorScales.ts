import { type Cell, type CoreRow } from "@tanstack/react-table";
import clsx from "clsx";
import { cn } from "~/utils/utils";

const defaultClasses = clsx("text-center");

export function getBackgroundColorScales({
  cellValue,
  columnId,
}: {
  cellValue: unknown | null | string;
  columnId: string;
}) {
  if (!cellValue) {
    return "";
  }

  if (columnId === "positionRatioDonutold") {
    const cellValueTyped = Math.abs(parseFloat(cellValue as string));

    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped > 95:
        return cn("bg-transparent", defaultClasses);
      case cellValueTyped > 90:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped > 80:
        return cn("bg-yellow-500", defaultClasses);
      case cellValueTyped > 70:
        return cn("bg-blue-500 text-zinc-800", defaultClasses);
      case cellValueTyped > 60:
        return cn("bg-green-500", defaultClasses);
      default:
        return cn("bg-white text-black", defaultClasses);
    }
  }
  if (columnId === "perpMarkToNfexIndex") {
    const cellValueTyped = Math.abs(cellValue as number);
    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped < 2:
        return cn("bg-transparent", defaultClasses);
      case cellValueTyped < 2.5:
        return cn("bg-red-500", defaultClasses);
      case cellValueTyped < 3:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped < 3.5:
        return cn("bg-yellow-500 text-zinc-800", defaultClasses);
      case cellValueTyped < 4:
        return cn("bg-green-500", defaultClasses);
      case cellValueTyped < 4.5:
        return cn("bg-indigo-500", defaultClasses);
      case cellValueTyped < 5:
        return cn("bg-zinc-700 text-zinc-200", defaultClasses);
      case cellValueTyped < 5.5:
        return cn("bg-zinc-500 text-zinc-200", defaultClasses);
      case cellValueTyped < 6:
        return cn("bg-zinc-300 text-zinc-600", defaultClasses);
      case cellValueTyped < 7:
        return cn("bg-zinc-200 text-zinc-800", defaultClasses);
      default:
        return cn("bg-white text-black", defaultClasses);
    }
  }
  if (columnId === "nftPerpMarkToIndex") {
    const cellValueTyped = Math.abs(cellValue as number);
    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped < 1:
        return cn("bg-transparent", defaultClasses);
      case cellValueTyped < 2:
        return cn("bg-red-500", defaultClasses);
      case cellValueTyped < 3:
        return cn("bg-yellow-500 text-zinc-800", defaultClasses);
      case cellValueTyped < 4:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped < 5:
        return cn("bg-green-500", defaultClasses);
      case cellValueTyped < 6:
        return cn("bg-blue-500", defaultClasses);
      default:
        return cn("bg-white text-zinc-800", defaultClasses);
    }
  }

  if (columnId === "nftPerpFundingRate") {
    const cellValueTyped = Math.abs(cellValue as number);
    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped < 0.01:
        return cn("bg-transparent", defaultClasses);
      case cellValueTyped < 0.02:
        return cn("bg-yellow-500 text-zinc-800", defaultClasses);
      case cellValueTyped < 0.03:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped < 0.04:
        return cn("bg-green-500", defaultClasses);
      case cellValueTyped < 0.05:
        return cn("bg-blue-500", defaultClasses);
      default:
        return cn("bg-white text-zinc-800", defaultClasses);
    }
  }
}
