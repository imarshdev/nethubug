import { useState, useEffect } from "react";
import BottomSheet from "../../../components/functions/bottomSheet";
import { useAppState } from "../../../utils/appStateProvider";
import "../../../components/styles/savings.css";

export default function SavingsBottomSheet() {
  const { modals, setModals, allocations, setAllocations, transactions, setTransactions } = useAppState();

  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalDays, setGoalDays] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [fundType, setFundType] = useState("");

  useEffect(() => {
    // Preselect goal if coming from a specific goal item
    if (modals.preselectedGoal) setSelectedGoal(modals.preselectedGoal);
  }, [modals.preselectedGoal]);

  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount || 0);

  // Add new goal
  const addGoal = () => {
    if (!goalName || !goalTarget || !goalDays) return alert("Enter goal name, target, and timeframe");

    const today = new Date();
    const deadline = new Date(today);
    deadline.setDate(today.getDate() + Number(goalDays));

    const newGoal = {
      id: Date.now(),
      name: goalName.trim(),
      target: +goalTarget,
      current: 0,
      days: +goalDays,
      startDate: today.toISOString(),
      deadline: deadline.toISOString(),
    };

    setAllocations(prev => ({
      ...prev,
      savings: {
        ...prev.savings,
        goals: [...(prev.savings.goals || []), newGoal],
      },
    }));

    setTransactions(prev => [
      {
        id: Date.now(),
        type: "GoalCreated",
        description: `Created goal "${newGoal.name}"`,
        amount: newGoal.target,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setGoalName(""); setGoalTarget(""); setGoalDays("");
    setModals(prev => ({ ...prev, isGoalOpen: false, preselectedGoal: null }));
  };

  // Allocate to goal
  const allocateToGoal = () => {
    if (!amountToAdd || !selectedGoal) return alert("Enter amount and select a goal");
    if (amountToAdd > allocations.savings.total) return alert("Not enough total savings");

    setAllocations(prev => ({
      ...prev,
      savings: {
        ...prev.savings,
        total: prev.savings.total - +amountToAdd,
        goals: prev.savings.goals.map(g =>
          g.name === selectedGoal ? { ...g, current: g.current + +amountToAdd } : g
        ),
      },
    }));

    setTransactions(prev => [
      {
        id: Date.now(),
        type: "GoalAllocation",
        description: `Allocated ${formatUGX(+amountToAdd)} to "${selectedGoal}"`,
        amount: +amountToAdd,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setAmountToAdd(""); setSelectedGoal(""); setModals(prev => ({ ...prev, isGoalOpen: false, preselectedGoal: null }));
  };

  // Allocate to fund
  const allocateToFund = () => {
    if (!amountToAdd || !fundType) return alert("Enter amount and choose a fund");
    if (amountToAdd > allocations.savings.total) return alert("Not enough total savings");

    setAllocations(prev => ({
      ...prev,
      savings: {
        ...prev.savings,
        total: prev.savings.total - +amountToAdd,
        [fundType]: prev.savings[fundType] + +amountToAdd,
      },
    }));

    setTransactions(prev => [
      {
        id: Date.now(),
        type: "FundAllocation",
        description: `Allocated ${formatUGX(+amountToAdd)} to ${fundType}`,
        amount: +amountToAdd,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setAmountToAdd(""); setFundType(""); setModals(prev => ({ ...prev, isGoalOpen: false }));
  };

  return (
    <BottomSheet
      open={modals.isGoalOpen}
      onClose={() => setModals(prev => ({ ...prev, isGoalOpen: false, preselectedGoal: null }))}
    >
      {/* Add New Goal */}
      {modals.action === "AddNewGoal" && (
        <div className="add-goal">
          <h3>Set New Goal</h3>
          <p>Goal Name</p>
          <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
          <p>Target Amount</p>
          <input type="tel" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} />
          <p>Timeframe (days)</p>
          <input type="number" value={goalDays} onChange={(e) => setGoalDays(e.target.value)} />
          <div className="bottom-sheet-action-buttons">
            <div className="close-button" onClick={() => setModals(prev => ({ ...prev, isGoalOpen: false, preselectedGoal: null }))}><p>Cancel</p></div>
            <div className="confirm-button" onClick={addGoal}><p>Confirm</p></div>
          </div>
        </div>
      )}

      {/* Allocate to Goal */}
      {modals.action === "AllocateToGoal" && (
        <div className="allocate-goal">
          <h3>Allocate to Goal</h3>
          {!selectedGoal && (
            <>
              <p>Select Goal:</p>
              <select value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value)}>
                <option value="">-- Select --</option>
                {(allocations.savings.goals || []).map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
            </>
          )}
          {selectedGoal && <p>Allocating to: <b>{selectedGoal}</b></p>}
          <p>Amount</p>
          <input type="tel" value={amountToAdd} onChange={(e) => setAmountToAdd(e.target.value)} />
          <div className="bottom-sheet-action-buttons">
            <div className="close-button" onClick={() => setModals(prev => ({ ...prev, isGoalOpen: false, preselectedGoal: null }))}><p>Cancel</p></div>
            <div className="confirm-button" onClick={allocateToGoal}><p>Confirm</p></div>
          </div>
        </div>
      )}

      {/* Allocate to Fund */}
      {modals.action === "AllocateToFund" && (
        <div className="allocate-fund">
          <h3>Allocate to Fund</h3>
          <p>Amount</p>
          <input type="tel" value={amountToAdd} onChange={(e) => setAmountToAdd(e.target.value)} />
          <p>Choose Fund</p>
          <div className="goal-buttons">
            {["emergency", "investments"].map(type => (
              <div
                key={type}
                className={`goal-button ${fundType === type ? "selected" : ""}`}
                onClick={() => setFundType(type)}
              >
                <p>{type === "emergency" ? "Emergency Fund" : "Investments"}</p>
              </div>
            ))}
          </div>
          <div className="bottom-sheet-action-buttons">
            <div className="close-button" onClick={() => setModals(prev => ({ ...prev, isGoalOpen: false }))}><p>Cancel</p></div>
            <div className="confirm-button" onClick={allocateToFund}><p>Confirm</p></div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}