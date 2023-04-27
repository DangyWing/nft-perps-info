import { isAddress } from "viem";
import type { Address } from "viem";

export function middleEllipsize(
  str: string | Address | undefined | null
): string {
  if (str === undefined || !str || !isAddress(str)) {
    return "";
  } else {
    return (
      str.substring(0, 5) + "..." + str.substring(str.length - 5, str.length)
    );
  }
}
