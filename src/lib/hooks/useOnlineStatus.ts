'use client';

import { useState, useEffect } from 'react';

/**
 * Interface du hook de statut en ligne
 */
export interface UseOnlineStatusReturn {
  /** Indicateur de connexion (true si online, false si offline) */
  isOnline: boolean;
}

/**
 * Hook personnalisé pour détecter l'état de la connexion réseau
 * Utilise navigator.onLine et écoute les événements online/offline
 */
export function useOnlineStatus(): UseOnlineStatusReturn {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    // État initial basé sur navigator.onLine
    if (typeof window !== 'undefined') {
      return navigator.onLine;
    }
    return true; // Par défaut, on considère qu'on est online (SSR)
  });

  useEffect(() => {
    // Fonction pour mettre à jour l'état
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Écouter les événements online et offline
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Cleanup
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return {
    isOnline,
  };
}
