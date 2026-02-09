import type { PriceEstimate } from '@/lib/types/booking';

/**
 * Prix par kilomètre en centimes (5 FCFA par mètre = 500 FCFA par km)
 */
export const PRICE_PER_KM = 500;

/**
 * Prix de base d'un trajet en centimes (10 FCFA)
 */
export const BASE_FARE = 1000;

/**
 * Calcule le prix estimé d'un trajet en fonction de la distance et de la durée
 * @param distance - Distance en mètres
 * @param duration - Durée en secondes
 * @returns Estimation de prix avec distance, duration, basePrice et total
 */
export function calculatePrice(
  distance: number,
  duration: number
): PriceEstimate {
  // Gestion des cas limites
  if (distance == null || duration == null) {
    throw new Error('Distance et duration sont requis');
  }

  if (isNaN(distance) || isNaN(duration)) {
    throw new Error('Distance et duration doivent être des nombres valides');
  }

  // Conversion en valeurs positives (valeurs négatives = 0)
  const safeDistance = Math.max(0, distance);
  const safeDuration = Math.max(0, duration);

  // Conversion de la distance en kilomètres
  const distanceInKm = safeDistance / 1000;

  // Calcul du prix de base : prix de base + (distance en km * prix par km)
  const basePrice = Math.round(BASE_FARE + distanceInKm * PRICE_PER_KM);

  // Le prix total est égal au prix de base (pas de frais supplémentaires pour l'instant)
  const total = basePrice;

  return {
    distance: safeDistance,
    duration: safeDuration,
    basePrice,
    total,
  };
}

/**
 * Formate un prix en centimes vers une chaîne lisible avec séparateur de milliers
 * @param price - Prix en centimes
 * @returns Prix formaté au format "X XXX FCFA"
 */
export function formatPrice(price: number): string {
  // Gestion des cas limites
  if (price == null || isNaN(price)) {
    return '0 FCFA';
  }

  // Conversion en valeur positive
  const safePrice = Math.max(0, Math.round(price));

  // Conversion des centimes en francs (division par 100)
  const priceInFrancs = safePrice / 100;

  // Formatage avec séparateur d'espace pour les milliers
  const formatted = priceInFrancs
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return `${formatted} FCFA`;
}
