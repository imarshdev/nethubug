import { useEffect } from "react";

export default function useThemeColor(color = "#ffffff") {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const originalColor = meta?.getAttribute("content");

    if (meta) meta.setAttribute("content", color);

    return () => {
      if (meta) meta.setAttribute("content", originalColor || "#ffffff");
    };
  }, [color]);
}
