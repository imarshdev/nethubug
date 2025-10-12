import { useState } from "react";
import { useAppState } from "../../utils/appStateProvider";
import "./account.css";

export default function AccountPage() {
  const {
    setPageIndex,
    transactions,
    allocations,
    balance,
    setTransactions,
    setAllocations,
    setBalance,
  } = useAppState();
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  // Clear all local storage and reset state
  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all saved data?")) {
      localStorage.clear();
      setBalance(0);
      setAllocations({
        needs: 0,
        wants: 0,
        savings: { total: 0, emergency: 0, investments: 0, goals: [] },
      });
      setTransactions([]);
      setPageIndex(0); // navigate back to Home
      window.location.reload();
    }
  };

  // Add new income source
  const addIncome = () => {
    if (!incomeName || !incomeAmount)
      return alert("Enter both name and amount");
    const newIncome = {
      id: Date.now(),
      name: incomeName.trim(),
      amount: +incomeAmount,
    };

    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "IncomeAdded",
        description: `Added income: ${newIncome.name}`,
        amount: newIncome.amount,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setBalance((prev) => prev + newIncome.amount);
    setIncomeName("");
    setIncomeAmount("");
  };

  return (
    <div className="account-page">
      <h1>Account Settings</h1>

      <div className="add-income-container">
        <input
          type="text"
          placeholder="Income Source Name"
          value={incomeName}
          onChange={(e) => setIncomeName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
        <button className="confirm-btn" onClick={addIncome}>
          Add
        </button>
      </div>

      <ul>
        {(transactions.filter((t) => t.type === "IncomeAdded") || []).map(
          (inc) => (
            <li key={inc.id}>
              <span>
                {inc.name}: UGX {inc.amount}
              </span>
              <button
                className="danger-btn"
                onClick={() => {
                  if (window.confirm(`Delete income source ${inc.name}?`)) {
                    setBalance((prev) => prev - inc.amount);
                    setTransactions((prev) =>
                      prev.filter((t) => t.id !== inc.id)
                    );
                  }
                }}
              >
                Remove
              </button>
            </li>
          )
        )}
      </ul>

      <button className="danger-btn" onClick={clearAllData}>
        Clear All Local Storage
      </button>
    </div>
  );
}
