// @DEV Put the nfex IndexPrice before the nftPerpMarkPrice so that negative numbers are returned for short positions
export function calcPercentageDifference(first: number, second: number) {
  return ((first - second) / ((first + second) / 2)) * 100;
}
