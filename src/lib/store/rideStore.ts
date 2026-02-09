import { create } from 'zustand';
import type { Ride, RideStatus } from '@/lib/types/ride';

/**
 * Interface du store de trajet
 */
interface RideStore {
  /** Trajet actuellement en cours */
  currentRide: Ride | null;
  /**
   * Définit le trajet actuel
   * @param ride - Trajet à définir
   */
  setCurrentRide: (ride: Ride) => void;
  /**
   * Met à jour le statut du trajet actuel
   * @param status - Nouveau statut du trajet
   */
  updateRideStatus: (status: RideStatus) => void;
  /**
   * Met à jour la position actuelle du chauffeur
   * @param location - Position du chauffeur (lat, lng)
   */
  updateDriverLocation: (location: { lat: number; lng: number }) => void;
  /**
   * Réinitialise le trajet actuel
   */
  clearRide: () => void;
}

/**
 * Store Zustand pour la gestion des trajets
 * Données temporaires (pas de persist)
 */
export const useRideStore = create<RideStore>((set) => ({
  currentRide: null,

  setCurrentRide: (ride) => {
    set({ currentRide: ride });
  },

  updateRideStatus: (status) => {
    set((state) => {
      if (!state.currentRide) {
        return state; // Ne rien faire si aucun trajet n'est défini
      }

      // Mettre à jour le statut et les dates selon le nouveau statut
      const updatedRide: Ride = {
        ...state.currentRide,
        status,
        // Mettre à jour startedAt si le statut passe à 'in_progress'
        ...(status === 'in_progress' && !state.currentRide.startedAt
          ? { startedAt: new Date() }
          : {}),
        // Mettre à jour completedAt si le statut passe à 'completed'
        ...(status === 'completed' && !state.currentRide.completedAt
          ? { completedAt: new Date() }
          : {}),
      };

      return { currentRide: updatedRide };
    });
  },

  updateDriverLocation: (location) => {
    set((state) => {
      if (!state.currentRide) {
        return state; // Ne rien faire si aucun trajet n'est défini
      }

      return {
        currentRide: {
          ...state.currentRide,
          driverLocation: location,
        },
      };
    });
  },

  clearRide: () => {
    set({ currentRide: null });
  },
}));
