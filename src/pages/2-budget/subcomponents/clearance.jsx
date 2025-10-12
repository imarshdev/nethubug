import "../../../components/styles/budget.css";
import { useState } from "react";

export default function ClearancesPage({ clearances, budgetManager }) {
  const [payAmount, setPayAmount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount || 0);

  return (
    <div className="budget-allocator">
      <h2>Clearances</h2>
      <table className="budget-table">
        <thead>
          <tr><th>Description</th><th>Progress</th><th>Remaining</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {clearances.length === 0 ? (
            <tr><td colSpan={4}>No clearances</td></tr>
          ) : (
            clearances.map((c) => {
              const remaining = c.totalAmount - (c.clearedAmount || 0);
              return (
                <tr key={c.id}>
                  <td>{c.description}</td>
                  <td>{formatUGX(c.clearedAmount || 0)} / {formatUGX(c.totalAmount)}</td>
                  <td>{formatUGX(remaining)}</td>
                  <td>
                    {remaining > 0 && (
                      <>
                        {selectedId === c.id ? (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="Amount" style={{ width: "80px" }} />
                            <button onClick={() => { budgetManager.clearPartOfClearance(c.id, Number(payAmount)); setPayAmount(0); setSelectedId(null); }}>Pay</button>
                            <button onClick={() => setSelectedId(null)}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setSelectedId(c.id)}>Pay Partial</button>
                        )}
                      </>
                    )}
                    <button style={{ marginLeft: "8px" }} onClick={() => budgetManager.deleteClearance(c.id)}>Clear All</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}