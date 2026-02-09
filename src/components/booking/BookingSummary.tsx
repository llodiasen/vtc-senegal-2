import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/pricing';
import type { Location } from '@/lib/types/booking';

interface BookingSummaryProps {
  /** Localisation de prise en charge */
  pickup: Location;
  /** Localisation de destination */
  dropoff: Location;
  /** Prix en centimes */
  price: number;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant BookingSummary - Récapitulatif visuel de la réservation
 */
export function BookingSummary({
  pickup,
  dropoff,
  price,
  className,
}: BookingSummaryProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-md p-4 sm:p-6', className)}>
      <div className="space-y-4">
        {/* Point de départ */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Départ</div>
            <div className="text-sm font-medium text-gray-900">
              {pickup.address}
            </div>
          </div>
        </div>

        {/* Ligne de connexion */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-3 flex justify-center">
            <div className="w-0.5 h-8 bg-gray-300" />
          </div>
          <div className="flex-1" />
        </div>

        {/* Point d'arrivée */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-primary-600" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Arrivée</div>
            <div className="text-sm font-medium text-gray-900">
              {dropoff.address}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 my-4" />

        {/* Prix */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 mb-1">
            {formatPrice(price)}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Paiement en espèces</span>
          </div>
        </div>
      </div>
    </div>
  );
}
