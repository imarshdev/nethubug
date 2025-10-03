import { useState } from "react";
import TopBar from "./components/blocks/0.topbar";
import Dashboard, { ActionButtons } from "./components/blocks/1.dashboard";
import Income from "./components/blocks/2.income";

export default function App() {
  const [page, setPage] = useState("Home");
  return (
    <div className="container">
      <TopBar page={page} setPage={setPage} />
      {page === "Home" && (
        <div className="content">
          <Dashboard
            balance={1000000}
            monthlyIncome={834000}
            dailyIncome={26000}
          />
          <Income />
        </div>
      )}
      <ActionButtons />
    </div>
  );
}
