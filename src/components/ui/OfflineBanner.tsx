'use client';

import { useOnlineStatus } from '@/lib/hooks';
import { cn } from '@/lib/utils/cn';

/**
 * Composant OfflineBanner - Banner fixe affiché en haut quand offline
 * Disparaît automatiquement quand la connexion revient
 */
export function OfflineBanner() {
  const { isOnline } = useOnlineStatus();

  // Ne rien afficher si online
  if (isOnline) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-orange-500 text-white',
        'px-4 py-3',
        'shadow-lg',
        'animate-slide-down',
        'pt-[calc(0.75rem+env(safe-area-inset-top))]' // Safe area pour iOS
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-sm font-medium text-center">
          Connexion perdue - Mode hors ligne
        </p>
      </div>
    </div>
  );
}
