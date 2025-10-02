export default function TopBar() {
  return (
    <div
      className="top-bar"
      style={{
        height: "60px",
        padding: "0 10px 10px 10px",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <span>hello</span>
      <Topper />
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import "../styles/tabs.css";

export function Topper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

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

  const tabs = ["Home", "Budget", "Insights", "Plans"];

  return (
    <div className="tabs-container" ref={containerRef}>
      {tabs.map((tab, index) => (
        <div
          key={tab}
          className={`tab-btn ${activeIndex === index ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          <p>{tab}</p>
        </div>
      ))}
      <span className="tab-indicator" style={indicatorStyle}></span>
    </div>
  );
}
