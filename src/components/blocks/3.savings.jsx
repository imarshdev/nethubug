import { useState } from "react";
import BottomSheet from "../functions/bottomSheet";
import "../../styles/savings.css";

export default function Savings({
  allocations,
  setAllocations,
  action,
  setAction,
  isOpen,
  setIsOpen,
}) {
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalDays, setGoalDays] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [fundType, setFundType] = useState(""); // "emergency" | "investments"

  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);

  // -------------------
  // Add New Goal
  // -------------------
  const addGoal = () => {
    if (!goalName || !goalTarget || !goalDays)
      return alert("Enter goal name, target, and timeframe");

    const today = new Date();
    const deadline = new Date(today);
    deadline.setDate(today.getDate() + Number(goalDays));

    const newGoal = {
      name: goalName.trim(),
      target: +goalTarget,
      current: 0,
      days: +goalDays,
      startDate: today.toISOString(),
      deadline: deadline.toISOString(),
    };

    setAllocations((prev) => ({
      ...prev,
      savings: {
        ...prev.savings,
        goals: [...(prev.savings.goals || []), newGoal],
      },
    }));

    setGoalName("");
    setGoalTarget("");
    setGoalDays("");
    setIsOpen(false);
  };

  // -------------------
  // Allocate to Goal
  // -------------------
  const confirmGoalAllocation = () => {
    if (!amountToAdd) return alert("Enter an amount");
    if (amountToAdd > allocations.savings.total)
      return alert("Not enough in total savings!");

    setAllocations((prev) => ({
      ...prev,
      savings: {
        ...prev.savings,
        total: prev.savings.total - +amountToAdd,
        goals: prev.savings.goals.map((g) =>
          g.name === selectedGoal
            ? { ...g, current: g.current + +amountToAdd }
            : g
        ),
      },
    }));

    setAmountToAdd("");
    setSelectedGoal("");
    setIsOpen(false);
  };

  // -------------------
  // Allocate to Fund
  // -------------------
  const confirmFundAllocation = () => {
    if (!amountToAdd || !fundType)
      return alert("Enter amount and choose fund type");
    if (amountToAdd > allocations.savings.total)
      return alert("Not enough in total savings!");

    setAllocations((prev) => ({
      ...prev,
      savings: {
        ...prev.savings,
        total: prev.savings.total - +amountToAdd,
        [fundType]: prev.savings[fundType] + +amountToAdd,
      },
    }));

    setAmountToAdd("");
    setFundType("");
    setIsOpen(false);
  };

  // -------------------
  // Delete Goal
  // -------------------
  const deleteGoal = (goalName) => {
    const goalToDelete = allocations.savings.goals.find(
      (g) => g.name === goalName
    );
    if (!goalToDelete) return;

    if (
      window.confirm(
        `Delete goal "${goalName}"? This will refund ${formatUGX(
          goalToDelete.current
        )}.`
      )
    ) {
      setAllocations((prev) => ({
        ...prev,
        savings: {
          ...prev.savings,
          total: prev.savings.total + goalToDelete.current,
          goals: prev.savings.goals.filter((g) => g.name !== goalName),
        },
      }));
    }
  };

  // -------------------
  // Helpers
  // -------------------
  const getDaysRemaining = (goal) => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getProgressColor = (percentage) => {
    if (percentage < 10) return "#d32f2f";
    if (percentage < 20) return "#e53935";
    if (percentage < 30) return "#f4511e";
    if (percentage < 40) return "#fb8c00";
    if (percentage < 50) return "#fbc02d";
    if (percentage < 60) return "#fdd835";
    if (percentage < 70) return "#c0ca33";
    if (percentage < 80) return "#7cb342";
    if (percentage < 90) return "#43a047";
    if (percentage < 100) return "#2e7d32";
    return "#00c853";
  };

  return (
    <div className="savings-container">
      <p>
        <b>Savings Overview</b>
      </p>
      <p>Total Savings: {formatUGX(allocations.savings.total)}</p>
      <p>Emergency Fund: {formatUGX(allocations.savings.emergency)}</p>
      <p>Investments: {formatUGX(allocations.savings.investments)}</p>

      <h3>Goals</h3>
      <div className="goal-items">
        {(allocations.savings.goals || []).length === 0 ? (
          <p>No goals yet</p>
        ) : (
          allocations.savings.goals.map((goal) => (
            <div key={`${goal.name}-${goal.startDate}`} className="goal-item">
              <div className="goal-header">
                <p>{goal.name}</p>
              </div>

              <div className="goal-progress">
                <p>Progress:</p>
                <p>{((goal.current / goal.target) * 100).toFixed(1) || 0}%</p>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(goal.current / goal.target) * 100}%`,
                    backgroundColor: getProgressColor(
                      (goal.current / goal.target) * 100
                    ),
                  }}
                ></div>
              </div>

              <div className="progress-details">
                <div className="progress-amount">
                  <div>{formatUGX(goal.current)}</div>
                  <div style={{ fontSize: "12px", marginLeft: "5px" }}>
                    of {formatUGX(goal.target)}
                  </div>
                </div>
                <p className="goal-days">{getDaysRemaining(goal)} days left</p>
              </div>

              <div
                className="delete-goal"
                onClick={() => deleteGoal(goal.name)}
              >
                <p>Delete</p>
              </div>
              <div
                className="allocate-to-goal"
                onClick={() => {
                  setSelectedGoal(goal.name);
                  setIsOpen(true);
                  setAction("AllocateToGoal");
                  setAmountToAdd(0); // reset input
                }}
              >
                <p>Allocate</p>
              </div>
              <div style={{ height: "35px" }}></div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Sheet */}
      <BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
        {/* ADD GOAL */}
        {action === "AddNewGoal" && (
          <div className="add-goal">
            <p>
              Allocating: <strong>{goalName}</strong>, amount:{" "}
              <strong>{goalName ? `${formatUGX(goalTarget)} ` : ""}</strong>
              <br /> for {""}
              <strong>{goalDays}</strong> days
            </p>
            <p>Goal name</p>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
            <p>Target amount</p>
            <input
              type="tel"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
            />
            <p>Timeframe (days)</p>
            <input
              type="number"
              value={goalDays}
              onChange={(e) => setGoalDays(e.target.value)}
            />
            <div className="bottom-sheet-action-buttons">
              <div
                className="close-button"
                onClick={() => {
                  setIsOpen(false);
                  setGoalName(0);
                  setGoalTarget("");
                  setGoalDays("");
                  setAction("");
                }}
              >
                <p>Cancel</p>
              </div>
              <div className="confirm-button" onClick={addGoal}>
                <p>Confirm</p>
              </div>
            </div>
          </div>
        )}

        {/* ALLOCATE TO SELECTED GOAL */}
        {selectedGoal && action === "AllocateToGoal" && (
          <div className="allocate-goal">
            <p>Allocating: {amountToAdd ? `${formatUGX(amountToAdd)} ` : ""}</p>
            <p>
              To:{" "}
              {selectedGoal ||
                (fundType === "emergency" ? "Emergency Fund" : "Investments")}
            </p>
            <br />
            <input
              type="tel"
              placeholder="Enter amount"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
            />
            <div className="bottom-sheet-action-buttons">
              <div
                className="close-button"
                onClick={() => {
                  setIsOpen(false);
                  setAmountToAdd(0);
                  setSelectedGoal("");
                  setFundType("");
                  setAction("");
                }}
              >
                <p>Cancel</p>
              </div>
              <div className="confirm-button" onClick={confirmGoalAllocation}>
                <p>Confirm</p>
              </div>
            </div>
          </div>
        )}

        {/* ALLOCATE TO FUNDS */}
        {action === "AllocateToFund" && (
          <div className="allocate-fund">
            <p className="live-preview"></p>
            <p>Amount to allocate</p>
            <input
              type="tel"
              placeholder="Enter amount"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
            />
            <br />
            <p>Choose Fund</p>
            <div className="goal-buttons">
              {["emergency", "investments"].map((type) => (
                <div
                  key={type}
                  className={`goal-button ${
                    fundType === type ? "selected" : ""
                  }`}
                  onClick={() => setFundType(type)}
                >
                  <p>
                    {type === "emergency" ? "Emergency Fund" : "Investments"}
                  </p>
                </div>
              ))}
            </div>
            <div className="bottom-sheet-action-buttons">
              <div
                className="close-button"
                onClick={() => {
                  setIsOpen(false);
                  setAmountToAdd(0);
                  setSelectedGoal("");
                  setFundType("");
                  setAction("");
                }}
              >
                <p>Cancel</p>
              </div>
              <div className="confirm-button" onClick={confirmFundAllocation}>
                <p>Confirm</p>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
