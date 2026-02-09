'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useRideStore } from '@/lib/store';
import { useBookingStore } from '@/lib/store';
import { Header, PageContainer } from '@/components/layout';
import { RideStatus, DriverCard } from '@/components/ride';
import { Button, Spinner } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { Ride, Driver } from '@/lib/types/ride';
import type { Location } from '@/lib/types/booking';

// Lazy load LiveMap pour améliorer les performances
const LiveMap = dynamic(() => import('@/components/ride/LiveMap').then((mod) => ({ default: mod.LiveMap })), {
  loading: () => (
    <div className="w-full h-[300px] bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  ),
  ssr: false, // Désactiver SSR pour les composants de carte
});

const MOCK_DRIVER: Driver = {
  id: 'driver-1',
  name: 'Mamadou Diallo',
  phone: '+221771234567',
  carModel: 'Toyota Corolla',
  carPlate: 'DK-1234-A',
  rating: 4.8,
};

// Coordonnées mock Dakar si pas de pickup/dropoff dans le store
const MOCK_PICKUP: Location = {
  lat: 14.6937,
  lng: -17.4441,
  address: 'Plateau, Dakar',
};

const MOCK_DROPOFF: Location = {
  lat: 14.7392,
  lng: -17.5075,
  address: 'Almadies, Dakar',
};

export default function BookingTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const rideId = params.id as string;

  const { currentRide, setCurrentRide, updateRideStatus, updateDriverLocation, clearRide } =
    useRideStore();
  const { pickup, dropoff, estimate } = useBookingStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const positionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  // Initialiser le ride au mount
  useEffect(() => {
    if (isInitialized) return;

    const pickupLocation = pickup || MOCK_PICKUP;
    const dropoffLocation = dropoff || MOCK_DROPOFF;

    const initialRide: Ride = {
      id: rideId,
      bookingId: rideId,
      driver: MOCK_DRIVER, // Sera utilisé plus tard
      status: 'searching',
      pickup: {
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
        address: pickupLocation.address,
      },
      dropoff: {
        lat: dropoffLocation.lat,
        lng: dropoffLocation.lng,
        address: dropoffLocation.address,
      },
      price: estimate?.total || 0,
    };

    setCurrentRide(initialRide);
    setIsInitialized(true);

    // Position initiale du chauffeur (proche du pickup)
    currentPositionRef.current = {
      lat: pickupLocation.lat + 0.01,
      lng: pickupLocation.lng + 0.01,
    };
  }, [rideId, pickup, dropoff, estimate, setCurrentRide, isInitialized]);

  // Transition : searching → assigned (après 2s)
  useEffect(() => {
    if (!isInitialized || !currentRide || currentRide.status !== 'searching') {
      return;
    }

    const timer = setTimeout(() => {
      if (currentRide) {
        const updatedRide: Ride = {
          ...currentRide,
          status: 'assigned',
          driver: MOCK_DRIVER,
        };
        setCurrentRide(updatedRide);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isInitialized, currentRide, setCurrentRide]);

  // Transition : assigned → arriving (après 3s supplémentaires, soit 5s total)
  useEffect(() => {
    if (!isInitialized || !currentRide || currentRide.status !== 'assigned') {
      return;
    }

    const timer = setTimeout(() => {
      if (currentRide) {
        const updatedRide: Ride = {
          ...currentRide,
          status: 'arriving',
          estimatedArrival: 480, // 8 min en secondes
        };
        setCurrentRide(updatedRide);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInitialized, currentRide, setCurrentRide]);

  // Mise à jour de la position du chauffeur toutes les 3s (après assigned)
  useEffect(() => {
    if (
      !isInitialized ||
      !currentRide ||
      (currentRide.status !== 'assigned' && currentRide.status !== 'arriving')
    ) {
      return;
    }

    // Démarrer l'interval de mise à jour de position
    positionIntervalRef.current = setInterval(() => {
      if (currentPositionRef.current) {
        // Mock mouvement : légère variation des coordonnées
        currentPositionRef.current.lat += (Math.random() - 0.5) * 0.001; // Variation ~100m
        currentPositionRef.current.lng += (Math.random() - 0.5) * 0.001;

        updateDriverLocation({
          lat: currentPositionRef.current.lat,
          lng: currentPositionRef.current.lng,
        });
      }
    }, 3000);

    // Cleanup
    return () => {
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
        positionIntervalRef.current = null;
      }
    };
  }, [isInitialized, currentRide, updateDriverLocation]);

  // Cleanup au unmount
  useEffect(() => {
    return () => {
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
      // clearRide() seulement si completed ou cancelled
      if (currentRide && (currentRide.status === 'completed' || currentRide.status === 'cancelled')) {
        clearRide();
      }
    };
  }, [currentRide, clearRide]);

  const handleCancel = () => {
    if (!currentRide) return;

    // Mettre à jour le statut à cancelled
    updateRideStatus('cancelled');
    
    // Nettoyer l'interval
    if (positionIntervalRef.current) {
      clearInterval(positionIntervalRef.current);
      positionIntervalRef.current = null;
    }

    // Rediriger vers la page de nouvelle réservation
    router.push('/booking/new');
  };

  if (!currentRide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  const canCancel =
    currentRide.status === 'searching' ||
    currentRide.status === 'assigned' ||
    currentRide.status === 'arriving';

  const pickupLocation: Location = {
    lat: currentRide.pickup.lat,
    lng: currentRide.pickup.lng,
    address: currentRide.pickup.address,
  };

  const dropoffLocation: Location = {
    lat: currentRide.dropoff.lat,
    lng: currentRide.dropoff.lng,
    address: currentRide.dropoff.address,
  };

  const driverLocation: Location | undefined = currentRide.driverLocation
    ? {
        lat: currentRide.driverLocation.lat,
        lng: currentRide.driverLocation.lng,
        address: '',
      }
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Course en cours" showBack onBack={() => router.back()} />

      <PageContainer className="flex-1 pb-24 space-y-6">
        {/* RideStatus */}
        <RideStatus
          status={currentRide.status}
          estimatedArrival={currentRide.estimatedArrival}
        />

        {/* DriverCard si driver assigné */}
        {(currentRide.status === 'assigned' ||
          currentRide.status === 'arriving' ||
          currentRide.status === 'in_progress') && (
          <DriverCard driver={currentRide.driver} />
        )}

        {/* LiveMap */}
        <LiveMap
          pickup={pickupLocation}
          dropoff={dropoffLocation}
          driverLocation={driverLocation}
        />
      </PageContainer>

      {/* Footer fixe avec bouton Annuler */}
      {canCancel && (
        <footer
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50',
            'bg-white border-t border-gray-200',
            'p-4 pb-[env(safe-area-inset-bottom)]',
            'shadow-lg'
          )}
        >
          <Button
            type="button"
            variant="danger"
            size="lg"
            onClick={handleCancel}
            className="w-full"
          >
            Annuler la course
          </Button>
        </footer>
      )}
    </div>
  );
}
