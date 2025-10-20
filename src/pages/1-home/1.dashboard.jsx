import "../../components/styles/dash.css";
import { useAppState } from "../../utils/appStateProvider";
import { useState, useMemo, useEffect } from "react";
import FullPageSheet from "../../components/functions/FullPageSheet";
import { PiArrowSquareInFill, PiArrowSquareOutFill } from "react-icons/pi";

export default function Dashboard() {
  const {
    balance,
    allocations,
    transactions = [],
    setModals,
    modals,
  } = useAppState();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    console.log(transactions);
  });

  // opening modals
  const openModal = (actionType) =>
    setModals({ ...modals, isOpen: true, action: actionType });

  // newest first (safe copy)
  const sortedTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [transactions]
  );

  const spendable = (allocations?.needs ?? 0) + (allocations?.wants ?? 0);

  const formatUGX = (amount) =>
    amount !== undefined && !isNaN(amount)
      ? new Intl.NumberFormat("en-UG", {
          style: "currency",
          currency: "UGX",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount)
      : "N/A";

  // Determine transaction color
  const getColor = (type) => {
    const inflow = ["Deposit", "GoalDeleted"];
    const outflow = [
      "Withdraw",
      "Expense Cleared (NEEDS)",
      "Wishlist Bought (WANTS)",
      "Clearance Payment (NEEDS)",
    ];
    const neutralBudget = [
      "Expense Added",
      "Wishlist Added",
      "Clearance Added",
    ];
    const neutralGoal = ["GoalCreated", "FundAllocation", "GoalAllocation"];
    const removed = [
      "Expense Deleted",
      "Wishlist Deleted",
      "Clearance Deleted",
    ];

    if (inflow.includes(type)) return "#2ecc71"; // vivid emerald (Deposit, inflow)
    if (outflow.includes(type)) return "#e53935"; // strong red (Withdraw, spend)
    if (neutralBudget.includes(type)) return "#1e88e5"; // deep blue (Expense/Wishlist/Clearance additions)
    if (neutralGoal.includes(type)) return "#6a1b9a"; // rich purple (Goal, Fund, Allocations)
    if (removed.includes(type)) return "#4C763B"; // neutral gray (Deletions)
    return "#043915"; // fallback: soft white-gray for visibility
  };

  // Determine transaction sign
  const getSign = (type) => {
    if (["Deposit", "GoalDeleted"].includes(type)) return "+";
    if (
      [
        "Withdraw",
        "Expense Cleared (NEEDS)",
        "Wishlist Bought (WANTS)",
        "Clearance Payment (NEEDS)",
      ].includes(type)
    )
      return "−";
    return ""; // neutral or removal
  };
  const isNegative = (type) =>
    [
      "Withdraw",
      "Clearance Payment",
      "Wishlist Bought",
      "Expense Cleared",
    ].includes(type);

  const totalAllocated = (allocations.savings.goals || []).reduce(
    (sum, goal) => sum + (goal.current || 0),
    0
  );
  const totalSavings = allocations.savings.total + totalAllocated;

  return (
    <div className="dash-container">
      <div style={{ width: "100%", height: "30px" }}></div>

      {/* BALANCE BANNER */}
      <div
        className="balance-banner"
        style={{
          padding: "15px",
          borderRadius: "10px",
          background: "#1b3c53",
          color: "#f5f5f5",
        }}
      >
        <p style={{ margin: 0, fontSize: "12px", color: "#cfd8dc" }}>
          Total Expenditure Balance
        </p>
        <div className="balance-text" style={{ margin: "5px 0 10px 0" }}>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 700,
              margin: 0,
              color: "#a5d6a7",
            }}
          >
            {formatUGX(spendable)}
          </p>
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#cfd8dc",
            margin: "8px 0",
            fontWeight: 600,
          }}
        >
          Current Total Balance:{" "}
          <span style={{ color: "#ffffff", fontWeight: 700 }}>
            {formatUGX(balance)}
          </span>
        </p>

        <p style={{ fontSize: "12px", color: "#cfd8dc", margin: "5px 0" }}>
          Total Available Savings:{" "}
          <span style={{ fontWeight: 600, color: "#ffeb3b" }}>
            {formatUGX(allocations.savings.total)}
          </span>
        </p>
        <p style={{ fontSize: "12px", color: "#cfd8dc", margin: "5px 0" }}>
          Total Allocated Savings:{" "}
          <span style={{ fontWeight: 600, color: "#ffb74d" }}>
            {formatUGX(totalAllocated)}
          </span>
        </p>
        <hr style={{ margin: "10px 0", borderColor: "#4f768a" }} />
        <p
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#81d4fa",
            margin: "5px 0",
          }}
        >
          Total Savings: {formatUGX(totalSavings)}
        </p>
        <br />
        <div className="dash-action-buttons">
          <div className="deposit" onClick={() => openModal("Deposit")}>
            <PiArrowSquareInFill className="image" />
            <p>Top up</p>
          </div>
          <div className="withdraw" onClick={() => openModal("Withdraw")}>
            <p>Widthdraw</p>
            <PiArrowSquareOutFill className="image" />
          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="transactions-placeholder">
        <div className="transactions-header">
          <p>Recent Transaction Activity</p>
          <p
            style={{ color: "#1b3c53", cursor: "pointer", fontWeight: 600 }}
            onClick={() => setSheetOpen(true)}
          >
            See All
          </p>
        </div>

        <div className="transactions-list">
          {sortedTransactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            sortedTransactions.slice(0, 20).map((t) => (
              <div
                key={t.id}
                className="transaction-item"
                style={{
                  borderLeft: `4px solid ${getColor(t.type)}`,
                  padding: "10px 8px",
                  marginBottom: "6px",
                  background: "#fff",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: getColor(t.type),
                      fontWeight: 600,
                      fontSize: "14px",
                      margin: "5px 0px",
                    }}
                  >
                    {t.type}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#555",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    {t.description || "No details"}
                  </p>
                </div>

                <div style={{ textAlign: "right", minWidth: "90px" }}>
                  <p
                    style={{
                      color: isNegative(t.type) ? "#c62828" : getColor(t.type),
                      fontWeight: 700,
                      fontSize: "14px",
                      margin: "5px 0px",
                    }}
                  >
                    {t.amount
                      ? `${getSign(t.type)} ${formatUGX(t.amount)}`
                      : "N/A"}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    {t.date ? new Date(t.date).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ height: "5vh" }}></div>

      {/* FULL PAGE SHEET */}
      <FullPageSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="full-transactions-list">
          <h2>All Transactions</h2>
          {sortedTransactions.length === 0 ? (
            <p>No transactions available</p>
          ) : (
            sortedTransactions.map((t) => (
              <div
                key={t.id}
                className="transaction-item"
                style={{
                  borderLeft: `4px solid ${getColor(t.type)}`,
                  padding: "10px 8px",
                  marginBottom: "6px",
                  background: "#fff",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: getColor(t.type),
                      fontWeight: 600,
                      fontSize: "14px",
                      margin: "5px 0px",
                    }}
                  >
                    {t.type}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#555",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    {t.description || "No details"}
                  </p>
                </div>

                <div style={{ textAlign: "right", minWidth: "90px" }}>
                  <p
                    style={{
                      color: isNegative(t.type) ? "#c62828" : "#2e7d32",
                      fontWeight: 700,
                      fontSize: "14px",
                      margin: "5px 0px",
                    }}
                  >
                    {t.amount
                      ? `${isNegative(t.type) ? "- " : "+ "}${formatUGX(
                          t.amount
                        )}`
                      : "N/A"}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    {t.date ? new Date(t.date).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </FullPageSheet>
    </div>
  );
}

// dashboard.jsx
