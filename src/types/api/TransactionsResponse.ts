import { CurrencyStrings } from "../Currencies";

/**
 * The Transcation object that represents the individual element from the /transactions endpoint.
 */
export default interface TransactionsResponse {
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  timestamp: string;
  type: "withdrawal" | "deposit";
  status: "pending" | "completed";
  currency: CurrencyStrings;
  amount: number;
}
