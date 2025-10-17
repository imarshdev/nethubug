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
    incomeSources,
    setIncomeSources, // ✅ make sure your appStateProvider includes this
  } = useAppState();

  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  // ✅ Add new income source (just listing, not adding money)
  const addIncomeSource = () => {
    if (!incomeName || !incomeAmount)
      return alert("Please enter both name and amount.");

    const newSource = {
      id: Date.now(),
      source: incomeName.trim(),
      amount: +incomeAmount,
    };

    setIncomeSources((prev) => [...(prev || []), newSource]);

    // Log the action for record keeping (optional, not balance-affecting)
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "IncomeSourceAdded",
        description: `Added income source: ${newSource.source}`,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    // ❌ Removed: setBalance(prev => prev + newIncome.amount);
    setIncomeName("");
    setIncomeAmount("");
  };

  // ✅ Remove income source
  const removeIncomeSource = (id) => {
    setIncomeSources((prev) => prev.filter((src) => src.id !== id));
  };

  // ✅ Clear everything
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
      setIncomeSources([]);
      setPageIndex(0);
      window.location.reload();
    }
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
          placeholder="Expected Amount (optional)"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
        <button className="confirm-btn" onClick={addIncomeSource}>
          Add Source
        </button>
      </div>

      <p>Income Sources</p>
      <ul>
        {(incomeSources || []).map((src) => (
          <li key={src.id}>
            <span>
              {src.source}: UGX{" "}
              {src.amount ? src.amount.toLocaleString() : "— (no set amount)"}
            </span>
            <button
              className="danger-btn"
              onClick={() =>
                window.confirm(`Delete source ${src.source}?`) &&
                removeIncomeSource(src.id)
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button className="danger-btn" onClick={clearAllData}>
        Clear All Local Storage
      </button>
    </div>
  );
}
