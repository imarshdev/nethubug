import { useAppState } from "../../../utils/appStateProvider";
import { logTransaction } from "../../../utils/transactionLogger";

export function useBudgetManager() {
  const { 
    expenses, setExpenses, 
    clearances, setClearances, 
    wishlist, setWishlist,
    transactions, setTransactions
  } = useAppState(); // <- all global

  return {
    expenses,
    clearances,
    wishlist,

    addExpense: (description, amount) => {
      const newExp = { id: Date.now(), description, amount, status: "pending" };
      setExpenses([...expenses, newExp]);
      logTransaction(setTransactions, "Expense Added", amount, description, new Date().toISOString());
    },
    clearExpense: (id) => {
      const exp = expenses.find(e => e.id === id);
      setExpenses(expenses.map(e => e.id === id ? { ...e, status: "cleared" } : e));
      if (exp) logTransaction(setTransactions, "Expense Cleared", exp.amount, exp.description, new Date().toISOString());
    },
    deleteExpense: (id) => {
      const exp = expenses.find(e => e.id === id);
      setExpenses(expenses.filter(e => e.id !== id));
      if (exp) logTransaction(setTransactions, "Expense Deleted", exp.amount, exp.description, new Date().toISOString());
    },

    addClearance: (description, totalAmount) => {
      const c = { id: Date.now(), description, totalAmount, clearedAmount: 0 };
      setClearances([...clearances, c]);
      logTransaction(setTransactions, "Clearance Added", totalAmount, description, new Date().toISOString());
    },
    clearPartOfClearance: (id, amount) => {
      const c = clearances.find(x => x.id === id);
      setClearances(clearances.map(c => c.id === id ? { ...c, clearedAmount: Math.min(c.clearedAmount + amount, c.totalAmount) } : c));
      if (c) logTransaction(setTransactions, "Clearance Payment", amount, c.description, new Date().toISOString());
    },
    deleteClearance: (id) => {
      const c = clearances.find(x => x.id === id);
      setClearances(clearances.filter(c => c.id !== id));
      if (c) logTransaction(setTransactions, "Clearance Deleted", c.totalAmount, c.description, new Date().toISOString());
    },

    addWishlistItem: (description, amount) => {
      const w = { id: Date.now(), description, amount, status: "pending" };
      setWishlist([...wishlist, w]);
      logTransaction(setTransactions, "Wishlist Added", amount, description, new Date().toISOString());
    },
    markWishlistBought: (id) => {
      const w = wishlist.find(x => x.id === id);
      setWishlist(wishlist.map(w => w.id === id ? { ...w, status: "bought" } : w));
      if (w) logTransaction(setTransactions, "Wishlist Bought", w.amount, w.description, new Date().toISOString());
    },
    deleteWishlistItem: (id) => {
      const w = wishlist.find(x => x.id === id);
      setWishlist(wishlist.filter(w => w.id !== id));
      if (w) logTransaction(setTransactions, "Wishlist Deleted", w.amount, w.description, new Date().toISOString());
    },
  };
}