
"use client"

import { useState, useEffect, useCallback } from 'react';

// A more robust implementation of useLocalStorage that handles server-side rendering
// and prevents hydration mismatches and infinite loops.
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Prevent build errors "window is not defined"
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Wrap setValue in useCallback to prevent it from being recreated on every render.
  // This is crucial for preventing infinite loops when the setter is passed down in context.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  }, [key, storedValue]);

  // This useEffect is to sync changes across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);


  return [storedValue, setValue];
}

export default useLocalStorage;
