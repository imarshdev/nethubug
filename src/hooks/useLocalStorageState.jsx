import { useState, useEffect } from "react";

export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error(`Error writing localStorage key "${key}":`, err);
    }
  }, [key, state]);

  return [state, setState];
}