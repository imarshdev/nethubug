import "../../../components/styles/budget.css";

export default function ExpensesPage({ expenses, budgetManager }) {
  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <div className="budget-allocator">
      <h2>Upcoming Expenses</h2>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={3}>No upcoming expenses</td>
            </tr>
          ) : (
            expenses.map((exp) => (
              <tr
                key={exp.id}
                style={{
                  textDecoration:
                    exp.status === "cleared" ? "line-through" : "none",
                }}
              >
                <td data-label="Description">{exp.description}</td>
                <td data-label="Amount">{formatUGX(exp.amount)}</td>
                <td
                  data-label="Actions"
                  style={{ display: "flex", gap: "8px" }}
                >
                  {exp.status !== "cleared" && (
                    <button onClick={() => budgetManager.clearExpense(exp.id)}>
                      Mark as Cleared
                    </button>
                  )}
                  <button onClick={() => budgetManager.deleteExpense(exp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
