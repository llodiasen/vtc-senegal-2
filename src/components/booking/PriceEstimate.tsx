import { cn } from '@/lib/utils/cn';
import { formatDistance, formatDuration } from '@/lib/utils/formatters';
import { formatPrice } from '@/lib/utils/pricing';
import type { PriceEstimate as PriceEstimateType } from '@/lib/types/booking';

interface PriceEstimateProps {
  /** Estimation de prix */
  estimate: PriceEstimateType | null;
  /** Affiche un skeleton loader */
  isLoading?: boolean;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant PriceEstimate - Affichage d'estimation de prix avec distance et durée
 */
export function PriceEstimate({
  estimate,
  isLoading = false,
  className,
}: PriceEstimateProps) {
  if (isLoading) {
    return (
      <div className={cn('bg-white rounded-lg shadow-md p-4 sm:p-6', className)}>
        <div className="space-y-4">
          {/* Skeleton pour distance */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2" />
              <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
            </div>
          </div>

          {/* Skeleton pour durée */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2" />
              <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
            </div>
          </div>

          {/* Skeleton pour prix */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-2" />
              <div className="h-3 bg-gray-100 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!estimate) {
    return null;
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-md p-4 sm:p-6', className)}>
      <div className="space-y-4">
        {/* Distance */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {formatDistance(estimate.distance)}
            </div>
            <div className="text-xs text-gray-500">Distance</div>
          </div>
        </div>

        {/* Durée */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {formatDuration(estimate.duration)}
            </div>
            <div className="text-xs text-gray-500">Durée estimée</div>
          </div>
        </div>

        {/* Prix */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
          <div className="flex-shrink-0">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-primary-600">
              {formatPrice(estimate.total)}
            </div>
            <div className="text-xs text-gray-500">Prix estimé</div>
          </div>
        </div>
      </div>
    </div>
  );
}
