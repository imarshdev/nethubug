import React from "react";
import { useSwipeable } from "react-swipeable";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { AppStateProvider, useAppState } from "./utils/appStateProvider";
import TopBar from "./components/layout/tabs";
import Dashboard from "./pages/1-home/1.dashboard";
import {
  ActionButtons,
  HomeBottomSheetComponent,
} from "./pages/1-home/DashboardExtras";
import BudgetAllocator from "./pages/2-budget/2.budget";
import Savings from "./pages/3-savings/3.savings";
import SavingsBottomSheet from "./pages/3-savings/helpers/savingsBottomSheet";
import AccountPage from "./pages/4-edit/4.edit";
// You can add other pages like BudgetAllocator, Savings, Edit later

// Container that handles swipe gestures
function SwipeableContainer({ children }) {
  const { pageIndex, setPageIndex } = useAppState();
  const { fullPageSheetOpen } = useAppState();
  const pagesCount = 4;

  const handlers = useSwipeable(
    fullPageSheetOpen
      ? {} // disable swipe completely if sheet open
      : {
          onSwipedLeft: () => {
            if (pageIndex < pagesCount - 1) setPageIndex(pageIndex + 1);
          },
          onSwipedRight: () => {
            if (pageIndex > 0) setPageIndex(pageIndex - 1);
          },
          trackMouse: true,
        }
  );

  return (
    <div {...handlers} className="swipe-container">
      {children}
    </div>
  );
}
// Wrapper to show the correct page based on pageIndex
function PageRenderer() {
  const { pageIndex } = useAppState();

  switch (pageIndex) {
    case 0:
      return <Dashboard />;
    case 1:
      return <BudgetAllocator />;
    case 2:
      return <Savings />;
    case 3:
      return <AccountPage />;
    default:
      return null;
  }
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="container">
        <TopBar />
        <SwipeableContainer>
          <PageRenderer />
        </SwipeableContainer>
      </div>
      <ActionButtons />
      <SavingsBottomSheet/>
      <HomeBottomSheetComponent />
    </AppStateProvider>
  );
}


// app 

