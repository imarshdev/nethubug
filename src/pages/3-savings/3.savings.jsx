import { useState } from "react";
import { useAppState } from "../../utils/appStateProvider";
import "../../components/styles/savings.css";
import SavingsBottomSheet from "./helpers/savingsBottomSheet";
export default function Savings() {
  const { allocations, setAllocations, modals, setModals, transactions, setTransactions } = useAppState();

  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);

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

  const deleteGoal = (goalName) => {
    const goalToDelete = allocations.savings.goals.find(g => g.name === goalName);
    if (!goalToDelete) return;

    if (window.confirm(`Delete goal "${goalName}"? This will refund ${formatUGX(goalToDelete.current)}.`)) {
      setAllocations(prev => ({
        ...prev,
        savings: {
          ...prev.savings,
          total: prev.savings.total + goalToDelete.current,
          goals: prev.savings.goals.filter(g => g.name !== goalName),
        },
      }));

      setTransactions(prev => [
        {
          id: Date.now(),
          type: "GoalDeleted",
          description: `Deleted goal "${goalName}"`,
          amount: goalToDelete.current,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  return (
    <div className="savings-container">
      <p><b>Savings Overview</b></p>
      <p>Total Savings: {formatUGX(allocations.savings.total)}</p>
      <p>Emergency Fund: {formatUGX(allocations.savings.emergency)}</p>
      <p>Investments: {formatUGX(allocations.savings.investments)}</p>

      <h3>Goals</h3>
      <div className="goal-items">
        {(allocations.savings.goals || []).length === 0 ? (
          <p>No goals yet</p>
        ) : (
          allocations.savings.goals.map(goal => (
            <div key={`${goal.name}-${goal.startDate}`} className="goal-item">
              <div className="goal-header">
                <p style={{letterSpacing: "2px"}}>{goal.name}</p>
              </div>

              <div className="goal-progress">
                <p style={{ fontSize: "12px" }}>Progress:</p>
                <p style={{ fontSize: "12px" }}>{((goal.current / goal.target) * 100).toFixed(1) || 0}%</p>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(goal.current / goal.target) * 100}%`,
                    backgroundColor: getProgressColor((goal.current / goal.target) * 100),
                  }}
                />
              </div>

              <div className="progress-details">
                <div className="progress-amount">
                  <p style={{fontSize: "14px"}}>{formatUGX(goal.current)}</p>
                  <p style={{ fontSize: "12px", marginLeft: "5px" }}>
                    of {formatUGX(goal.target)}
                  </p>
                </div>
                <p className="goal-days" style={{ fontSize: "12px" }}>{getDaysRemaining(goal)} days left</p>
              </div>

              <div style={{height: "40px"}}></div>

              <div className="delete-goal" onClick={() => deleteGoal(goal.name)}>
                <p>Delete</p>
              </div>
              <div
                className="allocate-to-goal"
                onClick={() => setModals(prev => ({
                  ...prev,
                  isGoalOpen: true,
                  action: "AllocateToGoal",
                  preselectedGoal: goal.name
                }))}
              >
                <p>Allocate</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Single centralized BottomSheet */}
      <SavingsBottomSheet />
    </div>
  );
}