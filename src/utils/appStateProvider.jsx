import React, { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [balance, setBalance] = useLocalStorageState("balance", 0);
  const [allocations, setAllocations] = useLocalStorageState("allocations", {
    needs: 0,
    wants: 0,
    savings: { total: 0, emergency: 0, investments: 0, goals: [] },
  });
  const [pageIndex, setPageIndex] = useLocalStorageState("pageIndex", 0);
  const [modals, setModals] = useLocalStorageState("modals", {
    isDepositOpen: false,
    isGoalOpen: false,
  });
  const [fullPageSheetOpen, setFullPageSheetOpen] = useState(false);
  const [transactions, setTransactions] = useLocalStorageState("transactions", []);

  // --- New: account settings ---
  const [incomeSources, setIncomeSources] = useLocalStorageState("incomeSources", []);
  const [username, setUsername] = useLocalStorageState("username", "");
  const [preferredCurrency, setPreferredCurrency] = useLocalStorageState("currency", "UGX");

  const value = {
    balance,
    setBalance,
    allocations,
    setAllocations,
    pageIndex,
    setPageIndex,
    modals,
    setModals,
    fullPageSheetOpen,
    setFullPageSheetOpen,
    transactions,
    setTransactions,
    incomeSources,
    setIncomeSources,
    username,
    setUsername,
    preferredCurrency,
    setPreferredCurrency,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}