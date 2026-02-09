/**
 * Types et interfaces pour la gestion des utilisateurs et de l'authentification
 */

/**
 * Interface représentant un utilisateur de l'application
 */
export interface User {
  /** Identifiant unique de l'utilisateur */
  id: string;
  /** Numéro de téléphone de l'utilisateur (utilisé pour l'authentification) */
  phone: string;
  /** Nom complet de l'utilisateur (optionnel) */
  name?: string;
  /** Date de création du compte utilisateur */
  createdAt: Date;
}

/**
 * Interface représentant l'état d'authentification de l'application
 */
export interface AuthState {
  /** Utilisateur actuellement connecté (null si non authentifié) */
  user: User | null;
  /** Token d'authentification JWT (null si non authentifié) */
  token: string | null;
  /** Indicateur booléen de l'état d'authentification */
  isAuthenticated: boolean;
}
