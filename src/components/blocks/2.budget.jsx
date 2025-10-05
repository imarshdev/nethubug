import "../styles/budget.css";

export default function BudgetAllocator({ totalBalance, allocations }) {
  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const totalPercentage =
    totalBalance === 0
      ? { needs: 0, wants: 0, savings: 0 }
      : {
          needs: ((allocations.needs / totalBalance) * 100).toFixed(1),
          wants: ((allocations.wants / totalBalance) * 100).toFixed(1),
          savings: ((allocations.savings.total / totalBalance) * 100).toFixed(1),
        };

  return (
    <div className="budget-allocator">
      <p>Current Budget Breakdown</p>
      <table className="budget-table">
        <thead>
          <tr>
            <th>
              <p style={{ fontSize: 18 }}>Category</p>
            </th>
            <th>
              <p style={{ fontSize: 18 }}>%age</p>
            </th>
            <th>
              <p style={{ fontSize: 18 }}>Amount</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>Total</p>
            </td>
            <td>
              <p>100%</p>
            </td>
            <td>
              <p>{formatUGX(totalBalance)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Fixed Costs</p>
            </td>
            <td>
              <p>{totalPercentage.needs}%</p>
            </td>
            <td>
              <p>{formatUGX(allocations.needs)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Variable Costs</p>
            </td>
            <td>
              <p>{totalPercentage.wants}%</p>
            </td>
            <td>
              <p>{formatUGX(allocations.wants)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Savings</p>
            </td>
            <td>
              <p>{totalPercentage.savings}%</p>
            </td>
            <td>
              <p>{formatUGX(allocations.savings.total)}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}