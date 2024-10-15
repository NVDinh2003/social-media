import { useState, useEffect } from "react";

export function useLocalStorage(key: string, property: string) {
  const [value, setValue] = useState(() => {
    const getValue = localStorage.getItem(key);

    if (getValue != null) return getValue;

    return property;
  });

  const removeValue = () => {
    localStorage.removeItem(key);
    setValue(property); // Cập nhật lại state value
    console.log(`Removed value for key "${key}". Current value: ${property}`); // Log giá trị hiện tại
  };

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue, removeValue] as const;
}
