import React from "react";
import { useAppState } from "../../utils/appStateProvider";

export default function Income() {
  const { incomeSources, preferredCurrency } = useAppState();

  // Format number to the user's preferred currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: preferredCurrency || "UGX",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="budget-section">
      <p>Sources of Income</p>
      <div className="empty-state">
        <table className="budget-table">
          <thead>
            <tr>
              <th>
                <p>Source</p>
              </th>
              <th>
                <p>Monthly Amount</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {incomeSources.length === 0 ? (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <p>No income sources added yet.</p>
                </td>
              </tr>
            ) : (
              (incomeSources || []).map((src) => (
                <tr key={src.id}>
                  <td>
                    <p>{src.source}</p>
                  </td>
                  <td>
                    <p>{formatCurrency(src.amount)}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ height: "10vh" }}></div>
    </div>
  );
}
