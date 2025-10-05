import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import TopBar from "./components/blocks/0.topbar";
import Dashboard, {
  ActionButtons,
  BottomSheetComponent,
} from "./components/blocks/1.dashboard";
import BudgetAllocator from "./components/blocks/2.budget";
import Savings from "./components/blocks/3.savings";
import Edit from "./components/blocks/4.edit";

export default function App() {
  const pages = ["Home", "Budget", "Savings", "Edit"];
  const [pageIndex, setPageIndex] = useState(0);
  const [prevPageIndex, setPrevPageIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [action, setAction] = useState("");

  // ---------- Local Storage ----------
  const getStoredData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [balance, setBalance] = useState(() => getStoredData("balance", 0));
  const [allocations, setAllocations] = useState(() =>
    getStoredData("allocations", {
      needs: 0,
      wants: 0,
      savings: { total: 0, emergency: 0, investments: 0, goals: [] },
    })
  );

  // ---------- Persist ----------
  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("allocations", JSON.stringify(allocations));
  }, [balance, allocations]);

  // ---------- Deposit ----------
  const handleDeposit = (amount) => {
    const needsAdd = amount * 0.5;
    const wantsAdd = amount * 0.3;
    const savingsAdd = amount * 0.2;

    setBalance(balance + amount);
    setAllocations((prev) => ({
      needs: prev.needs + needsAdd,
      wants: prev.wants + wantsAdd,
      savings: {
        ...prev.savings,
        total: prev.savings.total + savingsAdd,
      },
    }));
  };

  // ---------- Withdraw ----------
  const handleWithdraw = (amount, reason, subReason = null) => {
    let { needs, wants, savings } = allocations;
    if (reason === "Fixed") {
      if (amount > needs) return alert("Not enough in Fixed!");
      needs -= amount;
    } else if (reason === "Variable") {
      if (amount > wants) return alert("Not enough in Variable!");
      wants -= amount;
    } else if (reason === "Savings") {
      if (amount > savings.total) return alert("Not enough in Savings!");
      savings.total -= amount;
      if (subReason && savings[subReason] !== undefined)
        savings[subReason] = Math.max(0, savings[subReason] - amount);
    }

    const newBalance = needs + wants + savings.total;
    setBalance(newBalance);
    setAllocations({ needs, wants, savings });
  };

  const spendableBalance = allocations.needs + allocations.wants;

  // ---------- Swipe Handlers ----------
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (pageIndex < pages.length - 1) {
        setPrevPageIndex(pageIndex);
        setTransitionDirection("left");
        setPageIndex(pageIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (pageIndex > 0) {
        setPrevPageIndex(pageIndex);
        setTransitionDirection("right");
        setPageIndex(pageIndex - 1);
      }
    },
    trackMouse: true,
  });

  // ---------- Page Transition ----------
  const getPageComponent = (index) => {
    switch (index) {
      case 0:
        return (
          <Dashboard
            balance={balance}
            spendable={spendableBalance}
            monthlyIncome={0}
            dailyIncome={0}
          />
        );
      case 1:
        return (
          <BudgetAllocator totalBalance={balance} allocations={allocations} />
        );
      case 2:
        return (
          <Savings
            allocations={allocations}
            setAllocations={setAllocations}
            action={action}
            setAction={setAction}
            isOpen={isGoalOpen}
            setIsOpen={setIsGoalOpen}
          />
        );
      case 3:
        return <Edit setPageIndex={setPageIndex} />;
      default:
        return null;
    }
  };

  return (
    <div className="container" {...handlers}>
      <TopBar pageIndex={pageIndex} setPageIndex={setPageIndex} />

      <div className="page-wrapper">
        <div
          key={pageIndex}
          className={`page-transition ${transitionDirection}`}
        >
          <div className="content">{getPageComponent(pageIndex)}</div>
        </div>
      </div>

      <ActionButtons
        setIsOpen={setIsOpen}
        setAction={setAction}
        page={pages[pageIndex]}
        setIsGoalOpen={setIsGoalOpen}
      />
      <BottomSheetComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={action}
        handleDeposit={handleDeposit}
        handleWithdraw={handleWithdraw}
      />
    </div>
  );
}
