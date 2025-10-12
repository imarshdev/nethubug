import React, { useEffect, useRef, useState } from "react";
import { useAppState } from "../../utils/appStateProvider";
import { useSwipeable } from "react-swipeable";
import "./tabs.css";

export default function TopBar() {
  const { pageIndex, setPageIndex } = useAppState();
  const tabs = ["Home", "Budget", "Savings", "Me"];
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [swipeOffset, setSwipeOffset] = useState(0); // new

  // update indicator whenever pageIndex or swipeOffset changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeTab = container.children[pageIndex];
    if (!activeTab) return;

    const width = activeTab.offsetWidth;
    let left = activeTab.offsetLeft + swipeOffset;

    setIndicatorStyle({
      width: `${width}px`,
      left: `${left}px`,
      transition: swipeOffset === 0 ? "all 0.5s ease" : "none",
    });
  }, [pageIndex, swipeOffset]);

  // swipe handlers for smooth tab movement
  const handlers = useSwipeable({
    onSwiping: ({ deltaX, dir }) => {
      const container = containerRef.current;
      if (!container) return;

      const currentTab = container.children[pageIndex];
      if (!currentTab) return;

      // approximate swipe offset proportional to container width
      let offset = deltaX / currentTab.offsetWidth * currentTab.offsetWidth;

      if (dir === "Left" && pageIndex < tabs.length - 1) setSwipeOffset(offset);
      else if (dir === "Right" && pageIndex > 0) setSwipeOffset(offset);
    },
    onSwipedLeft: () => {
      if (pageIndex < tabs.length - 1) setPageIndex(pageIndex + 1);
      setSwipeOffset(0);
    },
    onSwipedRight: () => {
      if (pageIndex > 0) setPageIndex(pageIndex - 1);
      setSwipeOffset(0);
    },
    trackMouse: true,
  });

  return (
    <div className="top-bar" {...handlers}>
      <div className="tabs-container" ref={containerRef}>
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            className={`tab-btn ${pageIndex === idx ? "active" : ""}`}
            onClick={() => setPageIndex(idx)}
          >
            <p>{tab}</p>
          </div>
        ))}
        <div className="tab-indicator" style={indicatorStyle}></div>
      </div>
    </div>
  );
}