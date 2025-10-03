import React, { useState, useRef, useEffect } from "react";
import "../styles/tabs.css";

export default function TopBar({ page, setPage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

  const tabs = ["Home", "Budget", "Savings", "Edit"];

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const activeEl = container.children[activeIndex];
      if (activeEl) {
        setIndicatorStyle({
          width: activeEl.offsetWidth + "px",
          left: activeEl.offsetLeft + "px",
        });
      }
    }
  }, [activeIndex]);

  const handleClick = (index) => {
    setActiveIndex(index);
    setPage(tabs[index]); // pass selected tab to parent
  };

  return (
    <div className="top-bar">
      <div className="tabs-container" ref={containerRef}>
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className={`tab-btn ${activeIndex === index ? "active" : ""}`}
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