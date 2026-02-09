import { cn } from '@/lib/utils/cn';
import { formatDuration } from '@/lib/utils/formatters';
import type { RideStatus as RideStatusType } from '@/lib/types/ride';

interface RideStatusProps {
  /** Statut actuel de la course */
  status: RideStatusType;
  /** Temps estimé d'arrivée en secondes */
  estimatedArrival?: number;
  /** Classes CSS supplémentaires */
  className?: string;
}

interface StatusConfig {
  message: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const statusConfigs: Record<RideStatusType, StatusConfig> = {
  searching: {
    message: "Recherche d'un chauffeur...",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  assigned: {
    message: 'Chauffeur trouvé !',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    color: 'text-primary-600',
    bgColor: 'bg-blue-50',
  },
  arriving: {
    message: 'Chauffeur en route',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  in_progress: {
    message: 'Course en cours',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  completed: {
    message: 'Course terminée',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  cancelled: {
    message: 'Course annulée',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
};

/**
 * Composant RideStatus - Affichage visuel du statut de la course
 */
export function RideStatus({
  status,
  estimatedArrival,
  className,
}: RideStatusProps) {
  const config = statusConfigs[status];
  const arrivalText =
    status === 'arriving' && estimatedArrival
      ? ` (${formatDuration(estimatedArrival)})`
      : '';

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md p-4 sm:p-6',
        'transition-all duration-300',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icône */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center',
            config.bgColor,
            config.color,
            'transition-colors duration-300'
          )}
        >
          {config.icon}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className={cn('text-base font-medium', config.color)}>
            {config.message}
            {arrivalText}
          </p>
        </div>
      </div>

      {/* Progress bar pour searching */}
      {status === 'searching' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                'h-full bg-primary-600 rounded-full',
                'animate-pulse',
                'transition-all duration-500'
              )}
              style={{
                width: '60%',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
