import BottomSheet from "../../components/functions/bottomSheet";
import { useState } from "react";
import { useAppState } from "../../utils/appStateProvider";

/* ---------------------- HOME BOTTOM SHEET ---------------------- */
export function HomeBottomSheetComponent() {
  const {
    modals,
    setModals,
    balance,
    setBalance,
    allocations,
    setAllocations,
    transactions,
    setTransactions,
  } = useAppState();

  const handleDeposit = (amount, source) => {
    const needsAdd = amount * 0.5;
    const wantsAdd = amount * 0.3;
    const savingsAdd = amount * 0.2;

    setBalance(balance + amount);
    setAllocations({
      ...allocations,
      needs: (allocations.needs ?? 0) + needsAdd,
      wants: (allocations.wants ?? 0) + wantsAdd,
      savings: {
        ...allocations.savings,
        total: (allocations.savings?.total ?? 0) + savingsAdd,
      },
    });

    // ✅ Log simplified transaction
    setTransactions([
      ...(transactions || []),
      {
        id: Date.now(),
        type: "Deposit",
        amount,
        description: `Deposit from ${source || "unspecified source"}`,
        date: new Date().toISOString(),
      },
    ]);
  };

  const handleWithdraw = (amount, reason) => {
    let { needs, wants, savings } = allocations;
    let sourceDesc = "";

    if (reason === "Fixed") {
      needs -= amount;
      sourceDesc = "Fixed costs";
    } else if (reason === "Variable") {
      wants -= amount;
      sourceDesc = "Variable costs";
    } else if (reason === "Savings") {
      savings.total -= amount;
      sourceDesc = "Savings fund";
    }

    setAllocations({ needs, wants, savings });
    setBalance(needs + wants + savings.total);

    // ✅ Log simplified transaction
    setTransactions([
      ...(transactions || []),
      {
        id: Date.now(),
        type: "Withdraw",
        amount,
        description: `Withdrawal for ${sourceDesc}`,
        date: new Date().toISOString(),
      },
    ]);
  };

  return (
    <BottomSheet
      open={modals.isOpen}
      onClose={() => setModals({ ...modals, isOpen: false })}
    >
      {modals.action === "Deposit" && <Deposit handleDeposit={handleDeposit} />}
      {modals.action === "Withdraw" && (
        <Withdraw handleWithdraw={handleWithdraw} />
      )}
    </BottomSheet>
  );
}
/* ---------------------- DEPOSIT ---------------------- */
export function Deposit({ handleDeposit }) {
  const { setModals, incomeSources } = useAppState(); // ✅ get incomeSources
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [source, setSource] = useState("");

  const presetAmounts = [1000, 2000, 5000, 10000, 13000, 15000];

  // ✅ Dynamic sources from AppState
  const availableSources = incomeSources?.length
    ? incomeSources.map((s) => s.source)
    : [];

  const handleConfirm = () => {
    handleDeposit(Number(amount), source || "unspecified source");
    setModals((prev) => ({ ...prev, isOpen: false }));
    setStep(1);
    setAmount("");
    setSource("");
  };

  return (
    <div className="bottom-sheet-content">
      <h3>Deposit</h3>

      {/* --- Step 1: Enter Amount --- */}
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

      {/* --- Step 2: Choose or Enter Source --- */}
      {step === 2 && (
        <>
          <p>Source</p>
          <input
            type="text"
            className="amount-input"
            placeholder="Enter or select source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          {/* ✅ Show saved income sources dynamically */}
          {availableSources.length > 0 && (
            <>
              <p>Saved Sources</p>
              <div className="preset-amounts">
                {availableSources.map((src, i) => (
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
        </>
      )}

      {/* --- Action Buttons --- */}
      <div className="bottom-sheet-action-buttons">
        <div
          className="close-button"
          onClick={() => setModals((prev) => ({ ...prev, isOpen: false }))}
        >
          <p>Cancel</p>
        </div>

        {step === 1 && (
          <div
            className="confirm-button"
            onClick={() => amount && setStep(2)}
          >
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

/* ---------------------- WITHDRAW ---------------------- */
export function Withdraw({ handleWithdraw }) {
  const { setModals } = useAppState();
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason) return alert("Select a withdraw reason (Fixed or Variable)");
    handleWithdraw(Number(amount), reason);
    setModals((prev) => ({ ...prev, isOpen: false }));
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
        <div
          className="close-button"
          onClick={() => setModals((prev) => ({ ...prev, isOpen: false }))}
        >
          <p>Cancel</p>
        </div>
        <div className="confirm-button" onClick={handleConfirm}>
          <p>Confirm</p>
        </div>
      </div>
    </div>
  );
}

// dash extras
