'use client';

import { useRouter } from 'next/navigation';
import { Header, PageContainer } from '@/components/layout';
import { Card } from '@/components/ui';
import { formatPrice } from '@/lib/utils/pricing';
import { cn } from '@/lib/utils/cn';

interface HistoryRide {
  id: string;
  pickup: { address: string };
  dropoff: { address: string };
  price: number; // en centimes
  status: 'completed' | 'cancelled';
  completedAt: Date;
}

// Mock data : 5 courses
const mockRides: HistoryRide[] = [
  {
    id: 'ride-1',
    pickup: { address: 'Plateau, Dakar' },
    dropoff: { address: 'Almadies, Dakar' },
    price: 5500,
    status: 'completed',
    completedAt: new Date('2024-02-05T14:30:00'),
  },
  {
    id: 'ride-2',
    pickup: { address: 'Parcelles Assainies, Dakar' },
    dropoff: { address: 'Ouakam, Dakar' },
    price: 4200,
    status: 'completed',
    completedAt: new Date('2024-02-04T10:15:00'),
  },
  {
    id: 'ride-3',
    pickup: { address: 'Yoff, Dakar' },
    dropoff: { address: 'Plateau, Dakar' },
    price: 3800,
    status: 'cancelled',
    completedAt: new Date('2024-02-03T16:45:00'),
  },
  {
    id: 'ride-4',
    pickup: { address: 'Almadies, Dakar' },
    dropoff: { address: 'Parcelles Assainies, Dakar' },
    price: 6200,
    status: 'completed',
    completedAt: new Date('2024-02-02T09:20:00'),
  },
  {
    id: 'ride-5',
    pickup: { address: 'Plateau, Dakar' },
    dropoff: { address: 'Yoff, Dakar' },
    price: 4800,
    status: 'completed',
    completedAt: new Date('2024-02-01T12:00:00'),
  },
];

/**
 * Formate une date au format français
 */
function formatDate(date: Date): string {
  const dateStr = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${dateStr}, ${timeStr}`;
}

export default function HistoryPage() {
  const router = useRouter();
  // Tri par date (plus récent en premier)
  const rides = [...mockRides].sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
  );

  const handleRideClick = (rideId: string) => {
    router.push(`/booking/${rideId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Historique" />

      <PageContainer className="py-6">
        {rides.length === 0 ? (
          // Empty state
          <Card className="flex flex-col items-center justify-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-500 text-lg font-medium">Aucune course</p>
          </Card>
        ) : (
          // Liste des courses
          <div className="space-y-4">
            {rides.map((ride) => (
              <Card
                key={ride.id}
                onClick={() => handleRideClick(ride.id)}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  'hover:shadow-lg hover:scale-[1.02]',
                  'active:scale-[0.98]'
                )}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRideClick(ride.id);
                  }
                }}
                aria-label={`Voir les détails de la course du ${formatDate(ride.completedAt)}`}
              >
                <div className="space-y-3">
                  {/* Date et badge status */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {formatDate(ride.completedAt)}
                    </p>
                    <span
                      className={cn(
                        'text-xs font-medium rounded-full px-2 py-1',
                        ride.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      )}
                    >
                      {ride.status === 'completed' ? 'Terminée' : 'Annulée'}
                    </span>
                  </div>

                  {/* Départ → Arrivée */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ride.pickup.address}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-primary-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ride.dropoff.address}
                      </p>
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-lg font-bold text-primary-600">
                      {formatPrice(ride.price)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
}
