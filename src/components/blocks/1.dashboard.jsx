import "../styles/dash.css";
import withdrawIcon from "../../assets/minus.png";
import depositIcon from "../../assets/add.png";

export default function Dashboard({ balance, dailyIncome, monthlyIncome }) {
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
    <div className="balance-banner">
      <p style={{ margin: 0, fontSize: "12px" }}>Total Expenditure Balance:</p>
      <div className="balance-text">
        <p>{formatUGX(balance)}</p>
      </div>
      {dailyIncome !== undefined && (
        <div className="monthly-income">
          <p style={{ margin: 0 }}>Daily Income: {formatUGX(dailyIncome)}</p>
        </div>
      )}
      {monthlyIncome !== undefined && (
        <div className="monthly-income">
          <p style={{ margin: 0 }}>
            Monthly Income: {formatUGX(monthlyIncome)}
          </p>
        </div>
      )}
    </div>
  );
}

export function ActionButtons() {
  return (
    <div className="action-buttons">
      <div className="deposit-button">
        <img className="image" src={depositIcon} alt="Deposit" />
        <p>Top Up</p>
      </div>
      <div className="withdraw-button">
        <p>Withdraw</p>
        <img className="image" src={withdrawIcon} alt="Withdraw" />
      </div>
    </div>
  );
}
