// To add a new currency, add it to this type. Typescript will then force you to create all the other required types below
export type CurrencyStrings = "USD" | "CHF" | "BTC";

export interface ICurrency {
  name: CurrencyStrings;
  smallestUnitMultiplier: number;
}

export const USD: ICurrency = {
  name: "USD",
  smallestUnitMultiplier: 100,
};

export const CHF: ICurrency = {
  name: "CHF",
  smallestUnitMultiplier: 100,
};

export const BTC: ICurrency = {
  name: "BTC",
  smallestUnitMultiplier: 100000000,
};

export const Currencies: { [key in CurrencyStrings]: ICurrency } = {
  BTC: BTC,
  CHF: CHF,
  USD: USD,
} as const;
