// src/hooks/useBudgetManager.js
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
import { useAppState } from "../../../utils/appStateProvider";
import { logTransaction } from "../../../utils/transactionLogger";

export function useBudgetManager() {
  const [expenses, setExpenses] = useLocalStorageState("expenses", []);
  const [clearances, setClearances] = useLocalStorageState("clearances", []);
  const [wishlist, setWishlist] = useLocalStorageState("wishlist", []);
  const { setTransactions } = useAppState(); // ✅ get global transaction setter

  return {
    expenses,
    clearances,
    wishlist,

    // --- Expenses ---
    addExpense: (description, amount) => {
      setExpenses([...expenses, { id: Date.now(), description, amount, status: "pending" }]);
      logTransaction(setTransactions, "Expense Added", amount, description, new Date().toISOString());
    },
    clearExpense: (id) => {
      const exp = expenses.find((e) => e.id === id);
      setExpenses(expenses.map((e) => (e.id === id ? { ...e, status: "cleared" } : e)));
      if (exp) logTransaction(setTransactions, "Expense Cleared", exp.amount, exp.description, new Date().toISOString());
    },
    deleteExpense: (id) => {
      const exp = expenses.find((e) => e.id === id);
      setExpenses(expenses.filter((e) => e.id !== id));
      if (exp) logTransaction(setTransactions, "Expense Deleted", exp.amount, exp.description, new Date().toISOString());
    },

    // --- Clearances ---
    addClearance: (description, amount) => {
      setClearances([...clearances, { id: Date.now(), description, totalAmount: amount, clearedAmount: 0 }]);
      logTransaction(setTransactions, "Clearance Created", amount, description, new Date().toISOString());
    },
    clearPartOfClearance: (id, pay) => {
      const c = clearances.find((x) => x.id === id);
      setClearances(clearances.map((c) =>
        c.id === id
          ? { ...c, clearedAmount: Math.min(c.clearedAmount + pay, c.totalAmount) }
          : c
      ));
      if (c) logTransaction(setTransactions, "Clearance Payment", pay, c.description, new Date().toISOString());
    },
    deleteClearance: (id) => {
      const c = clearances.find((x) => x.id === id);
      setClearances(clearances.filter((c) => c.id !== id));
      if (c) logTransaction(setTransactions, "Clearance Deleted", c.totalAmount, c.description, new Date().toISOString());
    },

    // --- Wishlist ---
    addWishlistItem: (description, amount) => {
      setWishlist([...wishlist, { id: Date.now(), description, amount, status: "pending" }]);
      logTransaction(setTransactions, "Wishlist Added", amount, description, new Date().toISOString());
    },
    markWishlistBought: (id) => {
      const w = wishlist.find((x) => x.id === id);
      setWishlist(wishlist.map((w) => (w.id === id ? { ...w, status: "bought" } : w)));
      if (w) logTransaction(setTransactions, "Wishlist Bought", w.amount, w.description, new Date().toISOString());
    },
    deleteWishlistItem: (id) => {
      const w = wishlist.find((x) => x.id === id);
      setWishlist(wishlist.filter((w) => w.id !== id));
      if (w) logTransaction(setTransactions, "Wishlist Deleted", w.amount, w.description, new Date().toISOString());
    },
  };
}