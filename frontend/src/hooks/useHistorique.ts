import { useState, useCallback } from 'react';

export interface HistoriqueEntry<T> {
  id: string;
  timestamp: number;
  actionType: string;
  payload: T;
}

export function useHistorique<T>(key: string) {
  const [historique, setHistorique] = useState<HistoriqueEntry<T>[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        try { return JSON.parse(stored); } catch {}
      }
    }
    return [];
  });

  const addEntry = useCallback((actionType: string, payload: T) => {
    const newEntry: HistoriqueEntry<T> = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      actionType,
      payload,
    };
    setHistorique(prev => {
      const updated = [...prev, newEntry];
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  }, [key]);

  const clearHistorique = useCallback(() => {
    setHistorique([]);
    localStorage.removeItem(key);
  }, [key]);

  return { historique, addEntry, clearHistorique };
}
