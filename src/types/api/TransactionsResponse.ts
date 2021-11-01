import { CurrencyStrings } from "../Currencies";

/**
 * The Transcation object that represents the individual element from the /transactions endpoint.
 */
type TransactionsResponse = {
  transactions: Transaction[];
};

export default TransactionsResponse;

export type Transaction = {
  id: string;
  timestamp: string;
  type: "withdrawal" | "deposit";
  status: "pending" | "completed";
  currency: CurrencyStrings;
  amount: number;
};
