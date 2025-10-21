import { useAppState } from "../../../utils/appStateProvider";
import { logTransaction } from "../../../utils/transactionLogger";

/* ---------------------- useBudgetManager ---------------------- */
export function useBudgetManager() {
  const {
    balance,
    setBalance,
    expenses,
    setExpenses,
    clearances,
    setClearances,
    wishlist,
    setWishlist,
    transactions,
    setTransactions,
    allocations,
    setAllocations,
  } = useAppState();

  /* ---------------- Helper Functions ---------------- */

  const readTotal = (key) => {
    const val = allocations?.[key];
    if (val == null) return 0;
    return typeof val === "number" ? Number(val) : Number(val.total ?? 0);
  };

  const writeAllocation = (key, newTotal, draft) => {
    const existing = allocations?.[key];
    if (existing == null || typeof existing === "number") {
      draft[key] = newTotal;
    } else {
      draft[key] = { ...existing, total: newTotal };
    }
  };

  const readTotalFrom = (obj, key) => {
    const val = obj?.[key];
    if (val == null) return 0;
    return typeof val === "number" ? Number(val) : Number(val.total ?? 0);
  };

  const updateAllocationsAndBalance = (updated) => {
    setAllocations(updated);

    const totalNeeds = readTotalFrom(updated, "needs");
    const totalWants = readTotalFrom(updated, "wants");
    const totalSavings = readTotalFrom(updated, "savings");

    const newBalance = totalNeeds + totalWants + totalSavings;
    setBalance(newBalance);
  };

  /* ---------------- Withdraw From Allocation ---------------- */
  const withdrawFromAllocation = async (primary, fallback, amount) => {
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Invalid amount");
      return { success: false };
    }

    const updated = structuredClone(allocations || {});
    const primaryTotal = readTotal(primary);
    const fallbackTotal = readTotal(fallback);

    if (primaryTotal >= amt) {
      writeAllocation(primary, primaryTotal - amt, updated);
      updateAllocationsAndBalance(updated);
      return { success: true, source: primary };
    }

    if (fallbackTotal >= amt) {
      const confirmUse = window.confirm(
        `Not enough in ${primary.toUpperCase()}. Use ${fallback.toUpperCase()} instead?`
      );
      if (confirmUse) {
        writeAllocation(fallback, fallbackTotal - amt, updated);
        updateAllocationsAndBalance(updated);
        return { success: true, source: fallback };
      }
      return { success: false };
    }

    alert(
      `Insufficient funds. Neither ${primary.toUpperCase()} nor ${fallback.toUpperCase()} can cover ${amt.toLocaleString()} UGX.`
    );
    return { success: false };
  };

  const now = () => new Date().toISOString();

  /* ---------------- Expenses ---------------- */
  const addExpense = (description, amount) => {
    const newExp = { id: Date.now(), description, amount, status: "pending" };
    setExpenses([...expenses, newExp]);

    logTransaction(
      setTransactions,
      "Expense Added",
      amount,
      description,
      now()
    );
  };

  const clearExpense = async (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (!exp) return;

    const result = await withdrawFromAllocation("needs", "wants", exp.amount);
    if (!result.success) return;

    setExpenses(
      expenses.map((e) => (e.id === id ? { ...e, status: "cleared" } : e))
    );

    logTransaction(
      setTransactions,
      `Expense Cleared (${result.source.toUpperCase()})`,
      exp.amount,
      exp.description,
      now()
    );
  };

  const deleteExpense = (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (!exp) return;
    setExpenses(expenses.filter((e) => e.id !== id));

    logTransaction(
      setTransactions,
      "Expense Deleted",
      exp.amount,
      exp.description,
      now()
    );
  };

  /* ---------------- Clearances ---------------- */
  const addClearance = (description, totalAmount) => {
    const c = {
      id: Date.now(),
      description,
      totalAmount,
      clearedAmount: 0,
    };
    setClearances([...clearances, c]);
    logTransaction(
      setTransactions,
      "Clearance Added",
      totalAmount,
      description,
      now()
    );
  };

  const clearPartOfClearance = async (id, amount) => {
    const c = clearances.find((x) => x.id === id);
    if (!c) return;

    const result = await withdrawFromAllocation("needs", "wants", amount);
    if (!result.success) return;

    setClearances(
      clearances.map((cl) =>
        cl.id === id
          ? {
              ...cl,
              clearedAmount: Math.min(
                cl.clearedAmount + Number(amount),
                cl.totalAmount
              ),
            }
          : cl
      )
    );

    logTransaction(
      setTransactions,
      `Clearance Payment (${result.source.toUpperCase()})`,
      amount,
      c.description,
      now()
    );
  };

  const deleteClearance = (id) => {
    const c = clearances.find((x) => x.id === id);
    if (!c) return;
    setClearances(clearances.filter((cl) => cl.id !== id));

    logTransaction(
      setTransactions,
      "Clearance Deleted",
      c.totalAmount,
      c.description,
      now()
    );
  };

  /* ---------------- Wishlist ---------------- */
  const addWishlistItem = (description, amount) => {
    const w = { id: Date.now(), description, amount, status: "pending" };
    setWishlist([...wishlist, w]);
    logTransaction(
      setTransactions,
      "Wishlist Added",
      amount,
      description,
      now()
    );
  };

  const markWishlistBought = async (id) => {
    const w = wishlist.find((x) => x.id === id);
    if (!w) return;

    const result = await withdrawFromAllocation("wants", "needs", w.amount);
    if (!result.success) return;

    setWishlist(
      wishlist.map((item) =>
        item.id === id ? { ...item, status: "bought" } : item
      )
    );

    logTransaction(
      setTransactions,
      `Wishlist Bought (${result.source.toUpperCase()})`,
      w.amount,
      w.description,
      now()
    );
  };

  const deleteWishlistItem = (id) => {
    const w = wishlist.find((x) => x.id === id);
    if (!w) return;
    setWishlist(wishlist.filter((item) => item.id !== id));

    logTransaction(
      setTransactions,
      "Wishlist Deleted",
      w.amount,
      w.description,
      now()
    );
  };

  /* ---------------- Return All ---------------- */
  return {
    expenses,
    clearances,
    wishlist,
    addExpense,
    clearExpense,
    deleteExpense,
    addClearance,
    clearPartOfClearance,
    deleteClearance,
    addWishlistItem,
    markWishlistBought,
    deleteWishlistItem,
  };
}
