import { useAppState } from "../../utils/appStateProvider";
import "../../components/styles/savings.css";
import SavingsBottomSheet from "./helpers/savingsBottomSheet";
import { MdDelete } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";

export default function Savings() {
  const {
    allocations,
    setAllocations,
    modals,
    setModals,
    transactions,
    setTransactions,
  } = useAppState();

  const openGoalModal = (actionType) =>
    setModals({ ...modals, isGoalOpen: true, action: actionType });

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

      setTransactions((prev) => [
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
      {/* ---------- Header Section ---------- */}
      <div className="savings-header">
        <h2>Savings Overview</h2>
        <p>
          Total Savings: <b>{formatUGX(allocations.savings.total)}</b>
        </p>

        <div className="savings-stats">
          <div className="savings-stat-card">
            <p className="label">Emergency Fund</p>
            <p className="value">{formatUGX(allocations.savings.emergency)}</p>
          </div>
          <div className="savings-stat-card">
            <p className="label">Investments</p>
            <p className="value">
              {formatUGX(allocations.savings.investments)}
            </p>
          </div>
        </div>

        <div className="savings-action-buttons">
          <div
            className="button"
            onClick={() => openGoalModal("AllocateToFund")}
          >
            <p>Allocate Savings</p>
          </div>
          <div className="button" onClick={() => openGoalModal("AddNewGoal")}>
            <p>Set New Goal</p>
          </div>
        </div>
      </div>

      {/* ---------- Goals Section ---------- */}
      <div className="savings-goals-section">
        <h3>Goals</h3>
        <div className="goal-items">
          {(allocations.savings.goals || []).length === 0 ? (
            <p className="no-goals">No goals yet</p>
          ) : (
            allocations.savings.goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;

              return (
                <div key={goal.name} className="goal-item">
                  <div className="goal-header">
                    <p className="goal-name">{goal.name}</p>
                    <p className="goal-days">
                      {getDaysRemaining(goal)} days left
                    </p>
                  </div>

                  <div className="progress-wrapper">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: getProgressColor(progress),
                        }}
                      ></div>
                    </div>
                    <div className="progress-info">
                      <div>
                        <p>
                          {formatUGX(goal.current)} of {formatUGX(goal.target)}
                        </p>
                        <p>{progress.toFixed(1)}%</p>
                      </div>
                      <div className="goal-actions">
                        <div
                          className="allocate-btn"
                          onClick={() =>
                            setModals((prev) => ({
                              ...prev,
                              isGoalOpen: true,
                              action: "AllocateToGoal",
                              preselectedGoal: goal.name,
                            }))
                          }
                        >
                          <RiFundsFill size={20} color="#000" />
                        </div>
                        <div
                          className="delete-btn"
                          onClick={() => deleteGoal(goal.name)}
                        >
                          <MdDelete size={20} color="#000" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div style={{ height: "10vh" }}></div>

      <SavingsBottomSheet />
    </div>
  );
}
