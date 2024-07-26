import { useEffect, useState } from "react";

export function useDebounce(value: string, delaysInMs: number) {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), delaysInMs);
    return () => clearTimeout(timerId);
  }, [value, delaysInMs]);

  return debounceValue;
}
