import "../styles/dash.css";
import withdrawIcon from "../../assets/minus.png";
import depositIcon from "../../assets/add.png";
import BottomSheet from "../functions/bottomSheet";
import { useState } from "react";

export default function Dashboard({
  balance,
  spendable,
  dailyIncome,
  monthlyIncome,
}) {
  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="balance-banner">
      <p style={{ margin: 0, fontSize: "12px" }}>Current Total Balance:</p>
      <div className="balance-text">
        <p>{formatUGX(balance)}</p>
      </div>

      <p style={{ fontSize: "14px", color: "#777" }}>
        Total Expenditure Balance: {formatUGX(spendable)}
      </p>

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

export function ActionButtons({ setIsOpen, setIsGoalOpen, setAction, page }) {
  return (
    <>
      {page === "Savings" ? (
        <div className="action-buttons">
          <div
            className="deposit-button"
            onClick={() => {
              setIsGoalOpen(true);
              setAction("AllocateToFund");
            }}
          >
            <p>Allocate Savings</p>
          </div>
          <div
            className="withdraw-button"
            onClick={() => {
              setIsGoalOpen(true);
              setAction("AddNewGoal");
            }}
          >
            <p>Set New Goal</p>
          </div>
        </div>
      ) : (
        <div className="action-buttons">
          <div
            className="deposit-button"
            onClick={() => {
              setIsOpen(true);
              setAction("Deposit");
            }}
          >
            <img className="image" src={depositIcon} alt="Deposit" />
            <p>Top Up</p>
          </div>
          <div
            className="withdraw-button"
            onClick={() => {
              setIsOpen(true);
              setAction("Withdraw");
            }}
          >
            <p>Withdraw</p>
            <img className="image" src={withdrawIcon} alt="Withdraw" />
          </div>
        </div>
      )}
    </>
  );
}

export function BottomSheetComponent({
  isOpen,
  setIsOpen,
  action,
  handleDeposit,
  handleWithdraw,
}) {
  return (
    <BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
      {action === "Deposit" && (
        <Deposit setIsOpen={setIsOpen} handleDeposit={handleDeposit} />
      )}
      {action === "Withdraw" && (
        <Withdraw setIsOpen={setIsOpen} handleWithdraw={handleWithdraw} />
      )}
    </BottomSheet>
  );
}

// ---------------------- Deposit ----------------------
export function Deposit({ setIsOpen, handleDeposit }) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [source, setSource] = useState("");

  const presetAmounts = [1000, 2000, 5000, 10000, 13000, 15000];
  const presetSources = ["Bike 1", "Bike 2", "Ev Bike", "Spotify"];

  const handleConfirm = () => {
    handleDeposit(Number(amount));
    setIsOpen(false);
    setStep(1);
    setAmount("");
    setSource("");
  };

  return (
    <div className="bottom-sheet-content">
      <h3>Deposit</h3>

      {step === 1 && (
        <>
          <p>Amount</p>
          <input
            type="tel"
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p>Preset Amounts</p>
          <div className="preset-amounts">
            {presetAmounts.map((amt, i) => (
              <div
                key={i}
                className="amount-card"
                onClick={() => setAmount(amt)}
              >
                <p>{amt.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p>Source</p>
          <input
            type="text"
            className="amount-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <p>Preset Sources</p>
          <div className="preset-amounts">
            {presetSources.map((src, i) => (
              <div
                key={i}
                className="amount-card"
                onClick={() => setSource(src)}
              >
                <p>{src}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="bottom-sheet-action-buttons">
        <div className="close-button" onClick={() => setIsOpen(false)}>
          <p>Cancel</p>
        </div>

        {step === 1 && (
          <div className="confirm-button" onClick={() => amount && setStep(2)}>
            <p>Next</p>
          </div>
        )}

        {step === 2 && (
          <div className="confirm-button" onClick={handleConfirm}>
            <p>Confirm</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Withdraw ----------------------
export function Withdraw({ setIsOpen, handleWithdraw }) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason) {
      alert("Select a withdraw reason (Fixed or Variable)");
      return;
    }

    handleWithdraw(Number(amount), reason);
    setIsOpen(false);
    setAmount("");
    setReason("");
  };

  return (
    <div className="bottom-sheet-content">
      <h3>Withdraw</h3>
      <p>Amount</p>
      <input
        type="tel"
        className="amount-input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <p>Reason / Category</p>
      <div className="preset-amounts">
        <div
          className={`amount-card ${reason === "Fixed" ? "active" : ""}`}
          onClick={() => setReason("Fixed")}
        >
          <p>Fixed Cost</p>
        </div>
        <div
          className={`amount-card ${reason === "Variable" ? "active" : ""}`}
          onClick={() => setReason("Variable")}
        >
          <p>Variable Cost</p>
        </div>
      </div>

      <div className="bottom-sheet-action-buttons">
        <div className="close-button" onClick={() => setIsOpen(false)}>
          <p>Cancel</p>
        </div>
        <div className="confirm-button" onClick={handleConfirm}>
          <p>Confirm</p>
        </div>
      </div>
    </div>
  );
}
