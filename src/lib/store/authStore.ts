import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/lib/types/user';

/**
 * Interface du store d'authentification
 */
interface AuthStore {
  /** Utilisateur actuellement connecté */
  user: User | null;
  /** Token d'authentification JWT */
  token: string | null;
  /** Indicateur d'état d'authentification (dérivé de user et token) */
  isAuthenticated: boolean;
  /** Indicateur si le store a été hydraté depuis localStorage */
  _hasHydrated: boolean;
  /**
   * Définit l'utilisateur authentifié et son token
   * @param user - Utilisateur à authentifier
   * @param token - Token JWT d'authentification
   */
  setAuth: (user: User, token: string) => void;
  /**
   * Déconnecte l'utilisateur et réinitialise l'état d'authentification
   */
  logout: () => void;
  /**
   * Marque le store comme hydraté
   */
  setHasHydrated: (state: boolean) => void;
}

/**
 * Store Zustand pour la gestion de l'authentification
 * Utilise le middleware persist pour sauvegarder l'état dans localStorage
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
        // Synchroniser avec les cookies pour le middleware
        if (typeof document !== 'undefined') {
          document.cookie = `auth-token=${token}; path=/; max-age=86400`; // 24h
          document.cookie = `auth-storage=${JSON.stringify({ user, token })}; path=/; max-age=86400`;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        // Supprimer les cookies
        if (typeof document !== 'undefined') {
          document.cookie = 'auth-token=; path=/; max-age=0';
          document.cookie = 'auth-storage=; path=/; max-age=0';
        }
      },

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: 'auth-storage', // Clé de stockage dans localStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Marquer comme hydraté après la réhydratation
        if (state) {
          state.setHasHydrated(true);
          // Recalculer isAuthenticated basé sur user et token
          state.isAuthenticated = !!(state.user && state.token);
          // Synchroniser les cookies si authentifié
          if (state.isAuthenticated && state.token && typeof document !== 'undefined') {
            document.cookie = `auth-token=${state.token}; path=/; max-age=86400`; // 24h
            document.cookie = `auth-storage=${JSON.stringify({ user: state.user, token: state.token })}; path=/; max-age=86400`;
          }
        }
      },
    }
  )
);
