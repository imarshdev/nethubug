import React from "react";
import "./BottomSheet.css";

export default function BottomSheet({ open, onClose, children }) {
  return (
    <>
      <div
        className={`bottomsheet-backdrop ${open ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`bottomsheet-panel ${open ? "open" : ""}`}>
        {children}
      </div>
    </>
  );
}
