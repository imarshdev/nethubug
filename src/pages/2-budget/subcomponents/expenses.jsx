import "../../../components/styles/budget.css";
import { useBudgetManager } from "../helper/usebudgethelper";

export default function ExpensesPage() {
  const { expenses, clearExpense, deleteExpense } = useBudgetManager();
  const formatUGX = (amt) => new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", minimumFractionDigits: 0 }).format(amt || 0);

  return (
    <div className="budget-allocator">
      <h2>Upcoming Expenses</h2>
      <table className="budget-table">
        <thead>
          <tr>
            <th><p>Description</p></th>
            <th><p>Amount </p></th>
            <th><p>Actions</p></th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr><td colSpan={3}>No upcoming expenses</td></tr>
          ) : (
            expenses.map((e) => (
              <tr key={e.id} style={{ textDecoration: e.status === "cleared" ? "line-through" : "none" }}>
                <td><p>{e.description}</p></td>
                <td><p>{formatUGX(e.amount)}</p></td>
                <td style={{ display: "flex", gap: "8px" }}>
                  {e.status !== "cleared" && <button onClick={() => clearExpense(e.id)}>Cleared</button>}
                  <button onClick={() => deleteExpense(e.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}