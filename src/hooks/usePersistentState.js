import { useState, useEffect } from 'react';

/**
 * Hook do trzymania stanu w localStorage.
 * @param {string} key - Klucz w localStorage.
 * @param {any} initialValue - Wartość początkowa (jeśli brak w localStorage).
 */
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(`Błąd odczytu z localStorage[${key}]:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Błąd zapisu do localStorage[${key}]:`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
