import { EurRatesResponse } from "../types/api/EurRatesResponse";
import { CurrencyStrings } from "../types/Currencies";

/**
 * Telper method to convert to EUR
 * @param eurRates
 * @param currency
 * @param amount
 * @returns
 */
export default function getEuroEquiv(
  eurRates: EurRatesResponse,
  currency: CurrencyStrings,
  amount: number
): number | null {
  const rate = eurRates[currency];
  if (rate === null) return null;
  return rate * amount;
}
