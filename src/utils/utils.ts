import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function calculate_percentage_change(first: number, second: number) {
  if (first < second) {
    return ((second - first) / first) * 100;
  }
  if (first > second) {
    return ((first - second) / first) * 100;
  } else {
    return 0;
  }
}
