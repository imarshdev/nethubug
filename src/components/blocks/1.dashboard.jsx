import "../styles/dash.css";
import withdrawIcon from "../../assets/minus.png";
import depositIcon from "../../assets/add.png";
import BottomSheet from "../functions/bottomSheet";

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

export function ActionButtons({ setIsOpen, setAction }) {
  return (
    <div className="action-buttons">
      <div
        className="deposit-button"
        onClick={() => {
          setIsOpen(true), setAction("Deposit");
        }}
      >
        <img className="image" src={depositIcon} alt="Deposit" />
        <p>Top Up</p>
      </div>
      <div
        className="withdraw-button"
        onClick={() => {
          setIsOpen(true), setAction("Withdraw");
        }}
      >
        <p>Withdraw</p>
        <img className="image" src={withdrawIcon} alt="Withdraw" />
      </div>
    </div>
  );
}

export function BottomSheetComponent({ isOpen, setIsOpen, action }) {
  return (
    <BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
      {action === "Deposit" && <Deposit setIsOpen={setIsOpen} />}
      {action === "Withdraw" && <Withdraw setIsOpen={setIsOpen} />}
    </BottomSheet>
  );
}

export function Deposit({ setIsOpen }) {
  return (
    <div className="bottom-sheet-content">
      <p>Deposit</p>
      <div className="bottom-sheet-action-buttons">
        <div className="close-button" onClick={() => setIsOpen(false)}>
          <p>Cancel</p>
        </div>
        <div className="confirm-button">
          <p>Confirm</p>
        </div>
      </div>
    </div>
  );
}
export function Withdraw({ setIsOpen }) {
  return (
    <div className="bottom-sheet-content">
      <p>Withdraw</p>
      <div className="bottom-sheet-action-buttons">
        <div className="close-button" onClick={() => setIsOpen(false)}>
          <p>Cancel</p>
        </div>
        <div className="confirm-button">
          <p>Confirm</p>
        </div>
      </div>
    </div>
  );
}
