'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Interface du hook de géolocalisation
 */
export interface UseGeolocationReturn {
  /** Position actuelle (lat, lng) ou null si non disponible */
  location: { lat: number; lng: number } | null;
  /** Message d'erreur ou null si aucune erreur */
  error: string | null;
  /** Indicateur de chargement */
  isLoading: boolean;
  /** Fonction pour obtenir la position actuelle (one-time) */
  getCurrentLocation: () => Promise<void>;
  /** Fonction pour démarrer le suivi continu de la position */
  watchPosition: () => void;
  /** Fonction pour arrêter le suivi continu de la position */
  clearWatch: () => void;
}

/**
 * Options pour la géolocalisation
 */
const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

/**
 * Hook personnalisé pour la géolocalisation
 * Gère les permissions, les erreurs et le suivi continu de la position
 */
export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  /**
   * Convertit un code d'erreur de géolocalisation en message convivial
   */
  const getErrorMessage = useCallback((errorCode: number): string => {
    switch (errorCode) {
      case GeolocationPositionError.PERMISSION_DENIED:
        return 'Activez la géolocalisation dans les paramètres';
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        return 'Position indisponible';
      case GeolocationPositionError.TIMEOUT:
        return 'Délai dépassé, veuillez réessayer';
      default:
        return 'Erreur de géolocalisation';
    }
  }, []);

  /**
   * Nettoie le watch ID actuel
   */
  const clearWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  /**
   * Obtient la position actuelle (one-time)
   */
  const getCurrentLocation = useCallback(async (): Promise<void> => {
    // Vérifier si la géolocalisation est disponible
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(getErrorMessage(error.code));
        setIsLoading(false);
      },
      GEOLOCATION_OPTIONS
    );
  }, [getErrorMessage]);

  /**
   * Démarre le suivi continu de la position
   */
  const watchPosition = useCallback(() => {
    // Vérifier si la géolocalisation est disponible
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    // Nettoyer le watch précédent s'il existe
    clearWatch();

    setIsLoading(true);
    setError(null);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(getErrorMessage(error.code));
        setIsLoading(false);
      },
      GEOLOCATION_OPTIONS
    );
  }, [clearWatch, getErrorMessage]);

  // Cleanup lors du démontage
  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, [clearWatch]);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
    watchPosition,
    clearWatch,
  };
}
