'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/lib/store';
import { Header, PageContainer } from '@/components/layout';
import { AddressInput, PriceEstimate } from '@/components/booking';
import { Button, Card } from '@/components/ui';
import { calculatePrice } from '@/lib/utils/pricing';
import { cn } from '@/lib/utils/cn';
import { useGeolocation } from '@/lib/hooks';
import type { Location } from '@/lib/types/booking';

export default function NewBookingPage() {
  const router = useRouter();
  const { pickup, dropoff, estimate, setPickup, setDropoff, setEstimate } =
    useBookingStore();

  const [isCalculating, setIsCalculating] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hook de géolocalisation pour auto-localisation
  const {
    location: geoLocation,
    getCurrentLocation,
  } = useGeolocation();

  // Auto-localisation au mount (silent fail si permission refusée)
  useEffect(() => {
    if (!pickup && typeof navigator !== 'undefined' && navigator.geolocation) {
      getCurrentLocation().catch(() => {
        // Silent fail - pas d'erreur visible si permission refusée
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Remplir automatiquement le pickup si géolocalisation réussie
  useEffect(() => {
    if (geoLocation && !pickup) {
      const location: Location = {
        lat: geoLocation.lat,
        lng: geoLocation.lng,
        address: 'Ma position',
      };
      setPickup(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoLocation]); // setPickup est stable

  const handlePickupChange = (address: string, location: any) => {
    setPickup(location);
    // Réinitialiser l'estimation si on change le départ
    if (estimate) {
      setEstimate({
        distance: 0,
        duration: 0,
        basePrice: 0,
        total: 0,
      });
    }
    setError(null);
  };

  const handleDropoffChange = (address: string, location: any) => {
    setDropoff(location);
    // Réinitialiser l'estimation si on change l'arrivée
    if (estimate) {
      setEstimate({
        distance: 0,
        duration: 0,
        basePrice: 0,
        total: 0,
      });
    }
    setError(null);
  };

  const handleCalculatePrice = async () => {
    if (!pickup || !dropoff) {
      return;
    }

    // Vérifier que départ et arrivée sont différents
    if (
      pickup.lat === dropoff.lat &&
      pickup.lng === dropoff.lng
    ) {
      setError('Le point de départ et d\'arrivée doivent être différents');
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      // Mock calcul avec délai 800ms
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock distance et durée
      const mockDistance = 8.5; // km
      const mockDuration = 25; // min

      // Conversion : distance en mètres, duration en secondes
      const distanceInMeters = mockDistance * 1000; // 8500 m
      const durationInSeconds = mockDuration * 60; // 1500 s

      const newEstimate = calculatePrice(distanceInMeters, durationInSeconds);
      setEstimate(newEstimate);
    } catch (err) {
      setError('Erreur lors du calcul du prix. Veuillez réessayer.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!estimate) {
      return;
    }

    setIsBooking(true);
    setError(null);

    try {
      // Mock création booking avec délai 1s
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Générer un rideId unique
      const rideId = 'ride-' + Date.now();

      // Redirection vers la page de suivi
      router.push(`/booking/${rideId}`);
    } catch (err) {
      setError('Erreur lors de la confirmation. Veuillez réessayer.');
      setIsBooking(false);
    }
  };

  const canCalculate = pickup !== null && dropoff !== null;
  const canConfirm = estimate !== null && estimate.total > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Nouvelle course" showBack onBack={() => router.back()} />

      <PageContainer className="py-6 space-y-6">
        {/* Section Adresses */}
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Adresses
          </h2>

          {/* Input Départ */}
          <AddressInput
            label="Point de départ"
            placeholder="Où souhaitez-vous être pris en charge ?"
            value={pickup?.address || ''}
            onChange={handlePickupChange}
            icon={
              <div className="w-3 h-3 rounded-full bg-green-500" />
            }
            error={error && !dropoff ? error : undefined}
          />

          {/* Input Arrivée */}
          <AddressInput
            label="Destination"
            placeholder="Où souhaitez-vous aller ?"
            value={dropoff?.address || ''}
            onChange={handleDropoffChange}
            icon={
              <div className="w-3 h-3 rounded-full bg-primary-600" />
            }
            error={error && dropoff ? error : undefined}
          />

          {/* Bouton Calculer le prix */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleCalculatePrice}
            disabled={!canCalculate || isCalculating}
            isLoading={isCalculating}
            className="w-full"
          >
            Calculer le prix
          </Button>
        </Card>

        {/* Section Estimation */}
        {isCalculating && (
          <PriceEstimate estimate={null} isLoading={true} />
        )}

        {estimate && estimate.total > 0 && !isCalculating && (
          <div className="space-y-4">
            <PriceEstimate estimate={estimate} />

            {/* Note paiement */}
            <Card className="bg-primary-50 border border-primary-200">
              <div className="flex items-center gap-2 text-sm text-primary-700">
                <svg
                  className="w-5 h-5"
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
                <span>Paiement en espèces au chauffeur</span>
              </div>
            </Card>

            {/* Bouton Confirmer */}
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleConfirmBooking}
              disabled={!canConfirm || isBooking}
              isLoading={isBooking}
              className="w-full"
            >
              Confirmer la réservation
            </Button>
          </div>
        )}

        {/* Message d'erreur global */}
        {error && !pickup && !dropoff && (
          <Card className="bg-red-50 border border-red-200">
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          </Card>
        )}
      </PageContainer>
    </div>
  );
}
