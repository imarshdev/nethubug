import React, { useState, useRef, useEffect } from "react";
import "../styles/tabs.css";

export default function TopBar({ pageIndex, setPageIndex }) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

  const tabs = ["Home", "Budget", "Savings", "Edit"];

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const activeEl = container.children[pageIndex];
      if (activeEl) {
        setIndicatorStyle({
          width: activeEl.offsetWidth + "px",
          left: activeEl.offsetLeft + "px",
        });
      }
    }
  }, [pageIndex]);

  const handleClick = (index) => {
    setPageIndex(index);
  };

  return (
    <div className="top-bar">
      <div className="tabs-container" ref={containerRef}>
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className={`tab-btn ${pageIndex === index ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            <p>{tab}</p>
          </div>
        ))}
        <div className="tab-indicator" style={indicatorStyle}></div>
      </div>
    </div>
  );
}