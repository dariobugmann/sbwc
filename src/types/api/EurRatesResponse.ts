import { CurrencyStrings } from "../Currencies";

/**
 * The rates object that comes from the /eur-rates endpoint.
 */
export type EurRatesResponse = { [key in CurrencyStrings]: number | null };
