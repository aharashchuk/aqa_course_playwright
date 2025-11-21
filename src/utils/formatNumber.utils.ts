import numeral from "numeral";

export function formatNumber(value: number, format: string): string {
  return numeral(value).format(format);
}
