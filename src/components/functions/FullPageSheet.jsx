import React, { useEffect } from "react";
import { useAppState } from "../../utils/appStateProvider";
import { useSwipeable } from "react-swipeable";
import "./FullPageSheet.css";

export default function FullPageSheet({ open, onClose, children }) {
  const { setFullPageSheetOpen } = useAppState();

  // Keep global state in sync when sheet opens/closes
  useEffect(() => {
    setFullPageSheetOpen(open);
  }, [open, setFullPageSheetOpen]);

  // Swipe right → left closes sheet
  const handlers = useSwipeable({
    onSwipedLeft: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <>
      <div
        className={`fullpage-backdrop ${open ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`fullpage-panel ${open ? "open" : ""}`} {...handlers}>
        <div className="fullpage-content">
          {children}
        </div>
      </div>
    </>
  );
}