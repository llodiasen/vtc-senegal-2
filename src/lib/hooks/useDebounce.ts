'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour debounce une valeur
 * @param value - Valeur à debounce
 * @param delay - Délai en millisecondes (défaut: 300ms)
 * @returns Valeur debounced
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Créer un timer pour mettre à jour la valeur après le délai
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: annuler le timer si la valeur change avant la fin du délai
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
