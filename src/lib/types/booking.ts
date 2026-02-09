/**
 * Types et interfaces pour la gestion des réservations
 */

/**
 * Interface représentant une localisation géographique
 */
export interface Location {
  /** Latitude de la localisation */
  lat: number;
  /** Longitude de la localisation */
  lng: number;
  /** Adresse textuelle de la localisation */
  address: string;
  /** Identifiant de lieu Google Places (optionnel) */
  placeId?: string;
}

/**
 * Interface représentant une estimation de prix pour un trajet
 */
export interface PriceEstimate {
  /** Distance estimée en mètres */
  distance: number;
  /** Durée estimée en secondes */
  duration: number;
  /** Prix de base du trajet en centimes */
  basePrice: number;
  /** Prix total estimé en centimes (incluant les frais supplémentaires) */
  total: number;
}

/**
 * Interface représentant une demande de réservation
 */
export interface BookingRequest {
  /** Localisation de prise en charge */
  pickup: Location;
  /** Localisation de destination */
  dropoff: Location;
  /** Estimation de prix pour le trajet */
  estimatedPrice: PriceEstimate;
}

/**
 * Statut possible d'une réservation
 */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

/**
 * Interface représentant une réservation complète
 */
export interface Booking {
  /** Identifiant unique de la réservation */
  id: string;
  /** Identifiant de l'utilisateur ayant effectué la réservation */
  userId: string;
  /** Localisation de prise en charge */
  pickup: Location;
  /** Localisation de destination */
  dropoff: Location;
  /** Prix final du trajet en centimes */
  price: number;
  /** Statut actuel de la réservation */
  status: BookingStatus;
  /** Date de création de la réservation */
  createdAt: Date;
}
