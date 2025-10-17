import "../../components/styles/budget.css";
import Income from "./income";
import BottomSheet from "../../components/functions/bottomSheet";
import FullPageSheet from "../../components/functions/FullPageSheet";
import ExpensesPage from "./subcomponents/expenses";
import ClearancesPage from "./subcomponents/clearance";
import WishlistPage from "./subcomponents/wishlist";
import { useState } from "react";
import { ActionButtons } from "../1-home/DashboardExtras";
import { useAppState } from "../../utils/appStateProvider";
import { useBudgetManager } from "./helper/usebudgethelper";

export default function BudgetAllocator() {
  const [fullPageSheet, setFullPageSheet] = useState({
    open: false,
    content: null,
  });
  const { modals, setModals, balance, allocations } = useAppState();
  const budgetManager = useBudgetManager();
  const { expenses, clearances, wishlist } = budgetManager;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const formatUGX = (amt) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
    }).format(amt || 0);

  const totalPercentage =
    balance === 0
      ? { needs: 0, wants: 0, savings: 0 }
      : {
          needs: ((allocations.needs / balance) * 100).toFixed(1),
          wants: ((allocations.wants / balance) * 100).toFixed(1),
          savings: ((allocations.savings.total / balance) * 100).toFixed(1),
        };

  const handleConfirm = () => {
    if (!description || !amount) return alert("Please fill in all fields");
    const amt = Number(amount);

    if (modals.action === "AddExpense")
      budgetManager.addExpense(description, amt);
    if (modals.action === "AddClearance")
      budgetManager.addClearance(description, amt);
    if (modals.action === "AddWishlist")
      budgetManager.addWishlistItem(description, amt);

    setDescription("");
    setAmount("");
    setModals({ ...modals, isGoalOpen: false, action: null });
  };

  return (
    <div className="budget-allocator">
      <ActionButtons />

      {/* ---------------- Budget Allocation Summary ---------------- */}
      <p style={{ marginTop: "80px" }}>Current Budget Breakdown</p>
      <table className="budget-table">
        <thead>
          <tr>
            <th><p> Category</p></th>
            <th><p>% Allocation </p></th>
            <th><p>Amount</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>Total</p></td>
            <td><p>100% </p></td>
            <td><p>{formatUGX(balance)}</p></td>
          </tr>
          <tr>
            <td><p>Fixed Costs</p></td>
            <td><p>{totalPercentage.needs}% </p></td>
            <td><p>{formatUGX(allocations.needs)}</p></td>
          </tr>
          <tr>
            <td><p>Variable Costs</p></td>
            <td><p>{totalPercentage.wants}%</p></td>
            <td><p>{formatUGX(allocations.wants)}</p></td>
          </tr>
          <tr>
            <td><p>Savings</p></td>
            <td><p>{totalPercentage.savings}%</p></td>
            <td><p>{formatUGX(allocations.savings.total)}</p></td>
          </tr>
        </tbody>
      </table>

      {/* ---------------- Budget Sections ---------------- */}
      <BudgetSection
        title="Upcoming Expenses"
        items={expenses}
        formatUGX={formatUGX}
        onAdd={() =>
          setFullPageSheet({ open: true, content: <ExpensesPage /> })
        }
      />
      <BudgetSection
        title="Clearances"
        items={clearances}
        formatUGX={formatUGX}
        onAdd={() =>
          setFullPageSheet({ open: true, content: <ClearancesPage /> })
        }
      />
      <BudgetSection
        title="Wishlist"
        items={wishlist}
        formatUGX={formatUGX}
        onAdd={() =>
          setFullPageSheet({ open: true, content: <WishlistPage /> })
        }
      />

      {/* ---------------- Full Page Sheet ---------------- */}
      <FullPageSheet
        open={fullPageSheet.open}
        onClose={() => setFullPageSheet({ open: false, content: null })}
      >
        {fullPageSheet.content}
      </FullPageSheet>

      <Income />
      <div style={{ height: "5vh" }} />

      {/* ---------------- Bottom Sheet ---------------- */}
      <BottomSheet
        open={modals.isBudgetOpen}
        onClose={() =>
          setModals({ ...modals, isBudgetOpen: false, action: null })
        }
      >
        <div className="bottom-sheet-content">
          <h3>
            {modals.action === "AddExpense"
              ? "Add Expense"
              : modals.action === "AddClearance"
              ? "Add Clearance"
              : "Add Wishlist Item"}
          </h3>
          <p>Description / Name</p>
          <input
            className="amount-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Amount</p>
          <input
            className="amount-input"
            type="tel"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="bottom-sheet-action-buttons">
            <div
              className="close-button"
              onClick={() =>
                setModals({ ...modals, isBudgetOpen: false, action: null })
              }
            >
              Cancel
            </div>
            <div className="confirm-button" onClick={handleConfirm}>
              Confirm
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

// ---------------- Budget Section Component ----------------
function BudgetSection({ title, items = [], formatUGX, onAdd }) {
  return (
    <div className="budget-section">
      <div className="section-header">
        <p>{title}</p>
        <p onClick={onAdd}>See all</p>
      </div>
      <table className="budget-table">
        <thead>
          <tr>
            {items.length === 0 ? (
              <>
                <th><p>Description</p></th>
                <th><p>Amount</p></th>
              </>
            ) : (
              Object.keys(items[0])
                .filter((k) => k !== "id")
                .map((k) => <th key={k}><p>{k}</p></th>)
            )}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={3}><p>No items</p></td>
            </tr>
          ) : (
            items.slice(0, 4).map((item) => (
              <tr key={item.id}>
                {Object.keys(item)
                  .filter((k) => k !== "id")
                  .map((k) => (
                    <td key={k}>
                      <p>{k === "amount"
                        ? formatUGX(item[k])
                        : item[k]}</p>
                    </td>
                  ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}



// budget allocator


