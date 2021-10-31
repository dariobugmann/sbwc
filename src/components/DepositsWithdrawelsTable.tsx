import React from "react";
import getEuroEquiv from "../helpers/getEuroEquiv";
import { EurRatesResponse } from "../types/api/EurRatesResponse";
import { Transaction } from "../types/api/TransactionsResponse";
import { Currencies, CurrencyStrings } from "../types/Currencies";

type Props = {
  transactions: Transaction[];
  eurRates: EurRatesResponse;
};

interface TableRow {
  currency: CurrencyStrings;
  totalCompletedWithdrawals: number;
  totalCompletedDeposits: number;
  totalPendingWithdrawals: number;
  totalPendingDeposits: number;
  totalBalance: number;
  totalBalanceEUR: number | null;
}

function groupTransactionsByCurrency(
  transactions: Transaction[],
  eurRates: EurRatesResponse
): TableRow[] {
  const groups: { [key in CurrencyStrings]: TableRow } = {
    BTC: {
      currency: "BTC",
      totalCompletedWithdrawals: 0,
      totalCompletedDeposits: 0,
      totalPendingWithdrawals: 0,
      totalPendingDeposits: 0,
      totalBalance: 0,
      totalBalanceEUR: 0,
    },
    CHF: {
      currency: "CHF",
      totalCompletedWithdrawals: 0,
      totalCompletedDeposits: 0,
      totalPendingWithdrawals: 0,
      totalPendingDeposits: 0,
      totalBalance: 0,
      totalBalanceEUR: 0,
    },
    USD: {
      currency: "USD",
      totalCompletedWithdrawals: 0,
      totalCompletedDeposits: 0,
      totalPendingWithdrawals: 0,
      totalPendingDeposits: 0,
      totalBalance: 0,
      totalBalanceEUR: 0,
    },
  } as const;

  transactions.forEach((t) => {
    if (t.status === "completed" && t.type === "deposit") {
      groups[t.currency].totalCompletedDeposits += t.amount;
    } else if (t.status === "completed" && t.type === "withdrawal") {
      groups[t.currency].totalCompletedWithdrawals += t.amount;
    } else if (t.status === "pending" && t.type === "deposit") {
      groups[t.currency].totalPendingDeposits += t.amount;
    } else if (t.status === "pending" && t.type === "withdrawal") {
      groups[t.currency].totalPendingWithdrawals += t.amount;
    } else {
      throw new Error("We should never reach here");
    }
  });

  Object.keys(groups).forEach((k) => {
    const key = k as CurrencyStrings;
    groups[key].totalBalance =
      groups[key].totalCompletedDeposits -
      groups[key].totalCompletedWithdrawals;
    groups[key].totalBalanceEUR = getEuroEquiv(
      eurRates,
      groups[key].currency,
      groups[key].totalBalance
    );
  });

  // return it as an array, easier to loop over in jsx. Plus, the currency is also part of the value.
  return Object.values(groups);
}

export default function DepositsWithdrawelsTable(props: Props) {
  // let's calculate some derived state
  const tableRows: TableRow[] = groupTransactionsByCurrency(
    props.transactions,
    props.eurRates
  );

  return (
    <div>
      <h2>Deposits and Withdrawals</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Total completed Withdrawals</th>
              <th>Total completed Deposits</th>
              <th>Total pending Withdrawals</th>
              <th>Total pending Deposits</th>
              <th>Total Balance</th>
              <th>Total Balance (EUR)</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((t) => (
              <tr key={t.currency}>
                <td>{t.currency}</td>
                <td>{t.totalCompletedWithdrawals}</td>
                <td>{t.totalCompletedDeposits}</td>
                <td>{t.totalPendingWithdrawals}</td>
                <td>{t.totalPendingDeposits}</td>
                <td>
                  {Math.round(
                    t.totalBalance *
                      Currencies[t.currency].smallestUnitMultiplier +
                      Number.EPSILON
                  ) / Currencies[t.currency].smallestUnitMultiplier}
                </td>
                <td>
                  {t.totalBalanceEUR
                    ? Math.round(t.totalBalanceEUR * 100 + Number.EPSILON) / 100
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
