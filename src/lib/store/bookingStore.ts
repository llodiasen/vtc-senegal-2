import { create } from 'zustand';
import type { Location, PriceEstimate } from '@/lib/types/booking';

/**
 * Interface du store de réservation
 */
interface BookingStore {
  /** Localisation de prise en charge */
  pickup: Location | null;
  /** Localisation de destination */
  dropoff: Location | null;
  /** Estimation de prix pour le trajet */
  estimate: PriceEstimate | null;
  /**
   * Définit la localisation de prise en charge
   * @param location - Localisation de prise en charge
   */
  setPickup: (location: Location) => void;
  /**
   * Définit la localisation de destination
   * @param location - Localisation de destination
   */
  setDropoff: (location: Location) => void;
  /**
   * Définit l'estimation de prix pour le trajet
   * @param estimate - Estimation de prix
   */
  setEstimate: (estimate: PriceEstimate) => void;
  /**
   * Réinitialise toutes les données de réservation
   */
  reset: () => void;
}

/**
 * Store Zustand pour la gestion des réservations
 * Données temporaires (pas de persist)
 */
export const useBookingStore = create<BookingStore>((set) => ({
  pickup: null,
  dropoff: null,
  estimate: null,

  setPickup: (location) => {
    set({ pickup: location });
  },

  setDropoff: (location) => {
    set({ dropoff: location });
  },

  setEstimate: (estimate) => {
    set({ estimate });
  },

  reset: () => {
    set({
      pickup: null,
      dropoff: null,
      estimate: null,
    });
  },
}));
