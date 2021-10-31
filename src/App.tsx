import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import DepositsWithdrawelsTable from "./components/DepositsWithdrawelsTable";
import LoadingSpinner from "./components/LoadingSpinner";
import TransactionsTable from "./components/TransactionsTable";
import ErrorView from "./components/ErrorView";
import SBHttpClient from "./http/SBHttpClient";
import { EurRatesResponse } from "./types/api/EurRatesResponse";
import TransactionsResponse, {
  Transaction,
} from "./types/api/TransactionsResponse";
import axios from "axios";

function App() {
  // fetch transactions on app mount since both components need the data.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, status: 400 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [eurRates, setEurRates] = useState<EurRatesResponse>({
    USD: null,
    BTC: null,
    CHF: null,
  });

  const fetchTransactions = async () => {
    setError({ isError: false, status: 400 });
    setIsLoading(true);
    try {
      const transactionsRes: TransactionsResponse = (
        await SBHttpClient.get("/transactions")
      ).data;
      const eurRatesRes: EurRatesResponse = (
        await SBHttpClient.get("/eur-rates")
      ).data;

      const transactions = transactionsRes.transactions;
      setTransactions(transactions);

      setEurRates(eurRatesRes);

      console.log("transactions", transactions);
      console.log("rates", eurRatesRes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setError({ isError: true, status: error?.response?.status || 400 });
      } else {
        setError({ isError: true, status: 400 });
      }
    }
  };

  const refreshOnClickHandler = async () => {
    await fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="app">
      {isLoading ? <LoadingSpinner /> : null}
      {error.isError ? (
        <ErrorView>
          Error fetchting data from server. Try refreshing or restarting the
          server!
        </ErrorView>
      ) : null}
      <header className="header">
        <h1>Web Challenge</h1>
        <Button onClick={refreshOnClickHandler}> Refresh</Button>
      </header>
      <TransactionsTable transactions={transactions} eurRates={eurRates} />
      <DepositsWithdrawelsTable
        transactions={transactions}
        eurRates={eurRates}
      />
    </div>
  );
}

export default App;
