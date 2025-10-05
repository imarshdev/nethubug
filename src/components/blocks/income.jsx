import "../styles/income.css";

export default function Income() {
  const rows = [
    { id: 1, source: "Spotify Families", amount: 170000 },
    { id: 2, source: "Bike 1", amount: 312000 },
    { id: 2, source: "Bike 2", amount: 312000 },
    { id: 2, source: "Electric Bike", amount: 40000 },
  ];

  // Format number to UGX
  const formatUGX = (amount) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="income-container">
      <h2>Sources of Income</h2>
      <table className="income-table">
        <thead>
          <tr>
            <th>
              <p style={{ fontSize: 18 }}>Source</p>
            </th>
            <th>
              <p style={{ fontSize: 18 }}>Amount</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <p>{row.source}</p>
              </td>
              <td>
                <p>
                  {formatUGX(row.amount)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
