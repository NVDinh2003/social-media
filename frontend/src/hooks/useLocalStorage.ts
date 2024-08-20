import { get } from "http";
import { useState, useEffect } from "react";

export function useLocalStorage(key: string, property: string) {
  const [value, setValue] = useState(() => {
    const getValue = localStorage.getItem(key);

    if (getValue != null) return getValue;

    return property;
  });

  const removeValue = () => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue, removeValue] as const;
}
