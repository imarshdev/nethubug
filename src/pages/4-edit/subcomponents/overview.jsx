import React from "react";
import { GoDotFill } from "react-icons/go";
import "./overview.css";

export default function SpendingOverview() {
  const expensediture = [
    { type: "Needs", amount: 170000 },
    { type: "Wants", amount: 120000 },
    { type: "Savings", amount: 90000 },
  ];

  const totalMonthIncome = 500000;

  const totalSpent = expensediture.reduce((sum, item) => sum + item.amount, 0);

  const colors = {
    Needs: "#f1c40f",
    Wants: "#9b59b6",
    Savings: "#2ecc71",
  };

  return (
    <div className="overview-container">
      <p className="overview-title">Spending Overview</p>
      <p className="overview-summary">
        Ush {totalSpent.toLocaleString()} spent{" "}
        <span style={{ fontSize: "12px" }}>
          Of Ush {totalMonthIncome.toLocaleString()}{" "}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 900 }}>this month</span>
      </p>

      {/* ---- Horizontal Spending Bar ---- */}
      <div className="spending-bar">
        {expensediture.map((item) => {
          const percentage = (item.amount / totalMonthIncome) * 100;
          return (
            <div
              key={item.type}
              className="spending-segment"
              style={{
                width: `${percentage}%`,
                backgroundColor: colors[item.type],
              }}
              title={`${item.type}: ${percentage.toFixed(1)}%`}
            />
          );
        })}
      </div>

      {/* ---- Legend ---- */}
      <div className="spending-legend">
        {expensediture.map((item) => (
          <div key={item.type} className="legend-item">
            <p>
              <GoDotFill color={colors[item.type]} /> {item.type}
            </p>
            <p className="legend-text">— Ush {item.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
