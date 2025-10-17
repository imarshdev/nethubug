import "../../../components/styles/budget.css";
import { useState } from "react";
import { useBudgetManager } from "../helper/usebudgethelper";

export default function ClearancesPage() {
  const { clearances, clearPartOfClearance, deleteClearance } =
    useBudgetManager();
  const [inputs, setInputs] = useState({});

  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
    }).format(amount || 0);

  const handleInputChange = (id, value) =>
    setInputs((prev) => ({ ...prev, [id]: value }));

  const handleDone = (c) => {
    const amt = Number(inputs[c.id]);
    if (amt > 0) {
      clearPartOfClearance(c.id, amt);
      setInputs((prev) => ({ ...prev, [c.id]: "" }));
    }
  };

  return (
    <div className="budget-allocator">
      <h2>Clearances</h2>
      <table className="budget-table clearance-table">
        <thead>
          <tr>
            <th>
              <p>Clearance</p>
            </th>
            <th>
              <p>Progress</p>
            </th>
            <th>
              <p>Pay</p>
            </th>
            <th>
              <p>Action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {clearances.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <p>No clearances</p>
              </td>
            </tr>
          ) : (
            clearances.map((c) => {
              const remaining = c.totalAmount - (c.clearedAmount || 0);
              const isFullyCleared = remaining <= 0;
              return (
                <tr key={c.id}>
                  <td
                    style={{
                      textDecoration: isFullyCleared ? "line-through" : "none",
                      opacity: isFullyCleared ? 0.6 : 1,
                    }}
                  >
                    <p>{c.description}</p>
                  </td>
                  <td>
                    <p style={{ fontWeight: 600, fontSize: "12px" }}>
                      {formatUGX(c.clearedAmount || 0)} /
                    </p>
                    <p style={{ fontWeight: 600, fontSize: "16px" }}>
                      {formatUGX(c.totalAmount)}
                    </p>
                  </td>
                  <td>
                    {!isFullyCleared ? (
                      <input
                        type="number"
                        value={inputs[c.id] || ""}
                        placeholder="Enter amount"
                        className="inline-input"
                        onChange={(e) =>
                          handleInputChange(c.id, e.target.value)
                        }
                      />
                    ) : (
                      <span style={{ color: "#2e7d32", fontWeight: 600 }}>
                        Cleared
                      </span>
                    )}
                  </td>
                  <td>
                    {!isFullyCleared ? (
                      <button
                        className="done-btn"
                        onClick={() => handleDone(c)}
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        className="delete-btn"
                        onClick={() => deleteClearance(c.id)}
                      >
                        Delete
                      </button>
                    )}
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
