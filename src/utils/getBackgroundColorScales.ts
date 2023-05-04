import clsx from "clsx";
import { cn } from "~/utils/utils";

const defaultClasses = clsx("text-slate-100 text-center bg-opacity-50");

export function getBackgroundColorScales({
  cellValue,
  columnId,
}: {
  cellValue: unknown | null;
  columnId: string;
}) {
  if (!cellValue) {
    return "";
  }

  if (columnId === "perpMarkToNfexMark") {
    const cellValueTyped = cellValue as number;
    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped < 0.5:
        return cn("bg-zinc-500", defaultClasses);
      case cellValueTyped < 1:
        return cn("bg-red-500", defaultClasses);
      case cellValueTyped < 1.5:
        return cn("bg-yellow-500", defaultClasses);
      case cellValueTyped < 2:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped < 2.5:
        return cn("bg-green-500", defaultClasses);
      case cellValueTyped < 3:
        return cn("bg-blue-500", defaultClasses);
      case cellValueTyped < 3.5:
        return cn("bg-indigo-500", defaultClasses);
      default:
        return cn("bg-zinc-200", defaultClasses);
    }
  }
  if (columnId === "nftPerpIndexToMark") {
    const cellValueTyped = cellValue as number;
    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped < 0.5:
        return cn("bg-zinc-500", defaultClasses);
      case cellValueTyped < 1:
        return cn("bg-red-500", defaultClasses);
      case cellValueTyped < 1.5:
        return cn("bg-yellow-500", defaultClasses);
      case cellValueTyped < 2:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped < 2.5:
        return cn("bg-blue-500", defaultClasses);
      case cellValueTyped < 3:
        return cn("bg-indigo-500", defaultClasses);
      default:
        return cn("bg-green-500", defaultClasses);
    }
  }

  if (columnId === "nftPerpFundingRate") {
    const cellValueTyped = cellValue as number;
    switch (true) {
      case cellValue === 0:
        return "";
      case cellValueTyped < 0.001:
        return cn("bg-zinc-500", defaultClasses);
      case cellValueTyped < 0.01:
        return cn("bg-red-500", defaultClasses);
      case cellValueTyped < 0.02:
        return cn("bg-yellow-500", defaultClasses);
      case cellValueTyped < 0.03:
        return cn("bg-orange-500", defaultClasses);
      case cellValueTyped < 0.04:
        return cn("bg-blue-500", defaultClasses);
      case cellValueTyped < 0.05:
        return cn("bg-indigo-500", defaultClasses);
      default:
        return cn("bg-green-500", defaultClasses);
    }
  }
}
