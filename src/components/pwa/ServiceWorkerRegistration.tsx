'use client';

import { useEffect } from 'react';

/**
 * Composant pour enregistrer le Service Worker
 * S'exécute uniquement côté client
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Vérifier que nous sommes dans le navigateur
    if (typeof window === 'undefined') {
      return;
    }

    // Ne pas enregistrer le Service Worker en développement (localhost)
    // pour que les modifications s'affichent immédiatement sans cache
    // Dev : ne pas enregistrer (géré par le layout qui ne rend pas ce composant)
    if (
      process.env.NODE_ENV === 'development' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      return;
    }

    // Vérifier que le Service Worker est supporté
    if (!('serviceWorker' in navigator)) {
      console.log('[PWA] Service Worker non supporté par ce navigateur');
      return;
    }

    // Enregistrer le Service Worker
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('[PWA] Service Worker enregistré avec succès:', registration.scope);

        // Vérifier les mises à jour périodiquement
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouveau Service Worker disponible
                console.log('[PWA] Nouveau Service Worker disponible');
                // Optionnel : afficher une notification à l'utilisateur
                // pour lui demander de recharger la page
              }
            });
          }
        });

        // Écouter les messages du Service Worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log('[PWA] Message reçu du Service Worker:', event.data);
        });
      } catch (error) {
        console.error('[PWA] Erreur lors de l\'enregistrement du Service Worker:', error);
      }
    };

    // Attendre que la page soit chargée avant d'enregistrer
    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
    }

    // Cleanup (désenregistrement si nécessaire)
    return () => {
      // Note : On ne désenregistre généralement pas le SW au cleanup
      // car il doit rester actif même après le démontage du composant
    };
  }, []);

  // Ce composant ne rend rien
  return null;
}
