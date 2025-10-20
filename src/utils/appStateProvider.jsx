import React, { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  /* ------------------ Core Financial State ------------------ */
  const [balance, setBalance] = useLocalStorageState("balance", 0);

  const [allocations, setAllocations] = useLocalStorageState("allocations", {
    needs: {
      total: 0,
      Expenses: [], // current expenses
      clearances: [], // planned purchases
    },
    wants: {
      total: 0,
      wishlist: [], // desired items
    },
    savings: {
      total: 0,
      emergency: 0,
      investments: 0,
      goals: [],
    },
  });

  const [transactions, setTransactions] = useLocalStorageState(
    "transactions",
    []
  );

  /* ------------------ Budget & Expense Data ------------------ */
  const [expenses, setExpenses] = useLocalStorageState("expenses", []);
  const [clearances, setClearances] = useLocalStorageState("clearances", []);
  const [wishlist, setWishlist] = useLocalStorageState("wishlist", []);

  /* ------------------ Account / Profile Settings ------------------ */
  const [incomeSources, setIncomeSources] = useLocalStorageState(
    "incomeSources",
    [] // each item: { id, source, monthlyAmount }
  );
  const [username, setUsername] = useLocalStorageState("username", "");
  const [preferredCurrency, setPreferredCurrency] = useLocalStorageState(
    "currency",
    "UGX"
  );

  /* ------------------ UI & Navigation State ------------------ */
  const [pageIndex, setPageIndex] = useLocalStorageState("pageIndex", 0);
  const [modals, setModals] = useLocalStorageState("modals", {
    isDepositOpen: false,
    isGoalOpen: false,
    isBudgetOpen: false,
    action: null,
  });
  const [fullPageSheetOpen, setFullPageSheetOpen] = React.useState(false);

  /* ------------------ Provider Value ------------------ */
  const value = {
    // Core
    balance,
    setBalance,
    allocations,
    setAllocations,
    transactions,
    setTransactions,

    // Budget
    expenses,
    setExpenses,
    clearances,
    setClearances,
    wishlist,
    setWishlist,

    // Account
    incomeSources,
    setIncomeSources,
    username,
    setUsername,
    preferredCurrency,
    setPreferredCurrency,

    // UI
    pageIndex,
    setPageIndex,
    modals,
    setModals,
    fullPageSheetOpen,
    setFullPageSheetOpen,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error("useAppState must be used within AppStateProvider");
  return context;
}




