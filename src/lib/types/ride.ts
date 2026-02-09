/**
 * Types et interfaces pour la gestion des trajets
 */

/**
 * Interface représentant un chauffeur
 */
export interface Driver {
  /** Identifiant unique du chauffeur */
  id: string;
  /** Nom complet du chauffeur */
  name: string;
  /** Numéro de téléphone du chauffeur */
  phone: string;
  /** Modèle du véhicule */
  carModel: string;
  /** Plaque d'immatriculation du véhicule */
  carPlate: string;
  /** Note moyenne du chauffeur (sur 5) */
  rating: number;
  /** URL de la photo du chauffeur (optionnel) */
  photo?: string;
}

/**
 * Statut possible d'un trajet
 */
export type RideStatus =
  | 'searching' // Recherche d'un chauffeur disponible
  | 'assigned' // Chauffeur assigné, en attente de confirmation
  | 'arriving' // Chauffeur en route vers le point de prise en charge
  | 'in_progress' // Trajet en cours
  | 'completed' // Trajet terminé
  | 'cancelled'; // Trajet annulé

/**
 * Interface représentant un trajet complet
 */
export interface Ride {
  /** Identifiant unique du trajet */
  id: string;
  /** Identifiant de la réservation associée */
  bookingId: string;
  /** Chauffeur assigné au trajet */
  driver: Driver;
  /** Statut actuel du trajet */
  status: RideStatus;
  /** Localisation de prise en charge */
  pickup: {
    lat: number;
    lng: number;
    address: string;
    placeId?: string;
  };
  /** Localisation de destination */
  dropoff: {
    lat: number;
    lng: number;
    address: string;
    placeId?: string;
  };
  /** Prix final du trajet en centimes */
  price: number;
  /** Position actuelle du chauffeur (optionnel, disponible uniquement pendant le trajet) */
  driverLocation?: {
    lat: number;
    lng: number;
  };
  /** Temps estimé d'arrivée du chauffeur en secondes (optionnel) */
  estimatedArrival?: number;
  /** Date de début du trajet (optionnel, définie lorsque le statut passe à 'in_progress') */
  startedAt?: Date;
  /** Date de fin du trajet (optionnel, définie lorsque le statut passe à 'completed') */
  completedAt?: Date;
}
