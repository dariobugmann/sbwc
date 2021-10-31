import React from "react";
import getEuroEquiv from "../helpers/getEuroEquiv";
import { EurRatesResponse } from "../types/api/EurRatesResponse";
import { Transaction } from "../types/api/TransactionsResponse";
import { CurrencyStrings } from "../types/Currencies";

type Props = {
  transactions: Transaction[];
  eurRates: EurRatesResponse;
};

interface TableRow {
  timestamp: string;
  currency: CurrencyStrings;
  amount: number;
  eurEquiv: number | null;
  type: string;
  status: string;
}

export default function TransactionsTable(props: Props) {
  // let's calculate some derived state
  const tableRows: TableRow[] = props.transactions.map((t) => ({
    timestamp: t.timestamp,
    currency: t.currency,
    amount: t.amount,
    eurEquiv: getEuroEquiv(props.eurRates, t.currency, t.amount),
    type: t.type,
    status: t.status,
  }));

  return (
    <div>
      <h2>Transactions History</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>EUR Equiv</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((t, id) => (
              <tr key={id}>
                <td>
                  {new Date(t.timestamp).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  })}
                </td>
                <td>{t.currency}</td>
                <td>{t.amount}</td>
                <td>
                  {t.eurEquiv
                    ? Math.round(t.eurEquiv * 100 + Number.EPSILON) / 100
                    : "N/A"}
                </td>
                <td>{t.type}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
