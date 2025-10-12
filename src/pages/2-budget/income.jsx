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
    <div className="budget-section">
      <p>Sources of Income</p>
      <table className="budget-table">
        <thead>
          <tr>
            <th>
              <p>Source</p>
            </th>
            <th>
              <p>Amount</p>
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
                <p>{formatUGX(row.amount)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{height: '10vh'}}></div>
    </div>
  );
}
