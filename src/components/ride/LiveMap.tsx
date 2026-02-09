import { cn } from '@/lib/utils/cn';
import type { Location } from '@/lib/types/booking';

interface LiveMapProps {
  /** Localisation de prise en charge */
  pickup: Location;
  /** Localisation de destination */
  dropoff: Location;
  /** Position actuelle du chauffeur (optionnel) */
  driverLocation?: Location;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant LiveMap - Placeholder pour la carte en direct
 * Ce composant sera remplacé plus tard par l'intégration Google Maps
 */
export function LiveMap({
  pickup,
  dropoff,
  driverLocation,
  className,
}: LiveMapProps) {
  return (
    <div
      className={cn(
        'w-full h-[300px]',
        'bg-gray-200 rounded-lg',
        'border border-gray-300',
        'flex items-center justify-center',
        className
      )}
    >
      <div className="text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <p className="text-gray-500 text-sm font-medium">
          Carte en cours d'intégration
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Google Maps sera intégré prochainement
        </p>
      </div>
    </div>
  );
}
