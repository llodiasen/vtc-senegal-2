'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Target, MapPin } from 'lucide-react';
import { AddressInput } from '@/components/booking';
import { Button } from '@/components/ui';
import { useBookingStore } from '@/lib/store';
import { useAuthStore } from '@/lib/store';
import { FeatureList } from './FeatureList';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';

export const BookingSection: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { pickup, dropoff, setPickup, setDropoff } = useBookingStore();

  const [pickupAddress, setPickupAddress] = useState(pickup?.address || '');
  const [dropoffAddress, setDropoffAddress] = useState(dropoff?.address || '');
  
  // Valeurs fixes pour le premier rendu (serveur + client) pour éviter l'erreur d'hydratation
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date('2024-01-01'));
  const [selectedTime, setSelectedTime] = useState<string>('00:00');

  // Mise à jour avec la date/heure réelle uniquement après le montage côté client
  useEffect(() => {
    setIsMounted(true);
    const now = new Date();
    setSelectedDate(now);
    setSelectedTime(
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate addresses
    if (!pickupAddress || !dropoffAddress) {
      alert('Veuillez renseigner les adresses de départ et d\'arrivée');
      return;
    }

    // Check if user is authenticated
    if (!user) {
      // Redirect to login with return URL
      router.push('/auth/login?redirect=/booking/new');
      return;
    }

    // If authenticated, navigate to booking page
    router.push('/booking/new');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      {/* Main heading - Style minimaliste */}
      <div className="space-y-3 w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-full">
          <span className="block text-white">Réservez facilement</span>
          <span className="block">
            <span className="text-white">vos </span>
            <span className="text-secondary-500 inline-flex items-center gap-2">
              trajets VTC
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 inline-block flex-shrink-0"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Forme diamant/speech bubble orange */}
                <path
                  d="M24 6 L38 16 L38 30 L24 40 L10 30 L10 16 Z"
                  fill="currentColor"
                />
                {/* Smartphone outline blanc */}
                <rect
                  x="18"
                  y="14"
                  width="12"
                  height="20"
                  rx="2.5"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                />
                <line
                  x1="24"
                  y1="16"
                  x2="24"
                  y2="32"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </span>
          <span className="block text-white">partout au Sénégal</span>
        </h1>

        <p className="text-sm sm:text-base text-white/90 leading-snug font-normal max-w-full">
          <span className="block">Gare, aéroport, rendez-vous client ou week-end en famille ?</span>
          <span className="block">Réservez 1 VTC à l'avance : prix fixes, chauffeurs ponctuels</span>
          <span className="block">et trajets garantis partout au Sénégal.</span>
        </p>
      </div>

      {/* Booking Form - Style minimaliste (fond blanc) */}
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow-lg w-full">
        {/* Address inputs - stacked vertically */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
              <Target className="w-4 h-4" />
            </div>
            <AddressInput
              label=""
              value={pickupAddress}
              onChange={(address, location) => {
                setPickupAddress(address);
                if (location) {
                  setPickup(location);
                }
              }}
              placeholder="Adresse de départ"
              className="pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
              <MapPin className="w-4 h-4" />
            </div>
            <AddressInput
              label=""
              value={dropoffAddress}
              onChange={(address, location) => {
                setDropoffAddress(address);
                if (location) {
                  setDropoff(location);
                }
              }}
              placeholder="Adresse d'arrivée"
              className="pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Date and Time inputs - side by side */}
        <div className="grid grid-cols-2 gap-3">
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={isMounted ? new Date() : new Date('2024-01-01')}
          />
          <TimePicker
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 text-base rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Consulter les prix
        </Button>
      </form>

      {/* Feature list */}
      <FeatureList />
    </div>
  );
};
