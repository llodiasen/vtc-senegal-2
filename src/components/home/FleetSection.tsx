'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Users, Luggage, Minus, ArrowRight } from 'lucide-react';
import { VehicleModal } from './VehicleModal';

// Types de véhicules
type VehicleType = 'all' | 'berline' | 'suv' | '4x4' | 'van';

interface Driver {
  name: string;
  photo?: string;
  rating: number;
  tripsCount: number;
  experience: number;
  languages: string[];
  certifications: string[];
  specialties: string[];
  status: 'available' | 'on-trip';
}

interface Vehicle {
  id: number;
  label: string;
  type: VehicleType;
  image: string;
  price: number;
  passengers: number;
  luggage: number;
  description: string;
  features: string[];
  fuelType: string;
  year: number;
  driver: Driver;
}

const FLEET_CATEGORIES: Vehicle[] = [
  {
    id: 1,
    label: 'BMW Série 5',
    type: 'berline',
    image: '/cars/1.webp',
    price: 25,
    passengers: 4,
    luggage: 3,
    description: 'Véhicules haut de gamme (Mercedes, Audi, BMW...)',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Sièges en cuir', 'Caméra de recul', 'Toit panoramique', 'Système audio premium', 'Régulateur de vitesse', 'Aide au stationnement', 'Éclairage LED', 'Chargeur USB', 'Sièges chauffants'],
    fuelType: 'Essence',
    year: 2022,
    driver: {
      name: 'Mamadou Diallo',
      rating: 4.8,
      tripsCount: 450,
      experience: 5,
      languages: ['FR', 'EN', 'Wolof'],
      certifications: ['Certifié VTC', 'Sécurité routière'],
      specialties: ['Aéroport', 'Événements', 'VIP'],
      status: 'available',
    },
  },
  {
    id: 2,
    label: 'Tesla Model S',
    type: 'berline',
    image: '/cars/7ac99ba95b.jpg',
    price: 15,
    passengers: 4,
    luggage: 3,
    description: '70% de véhicules hybrides bas carbone',
    features: ['100% Électrique', 'Autopilot', 'Écran tactile', 'Wi-Fi', 'Chargement sans fil', 'Climatisation', 'GPS', 'Sièges en cuir', 'Caméra de recul', 'Système audio premium', 'Régulateur de vitesse', 'Chargeur USB'],
    fuelType: 'Électrique',
    year: 2023,
    driver: {
      name: 'Amadou Ba',
      rating: 4.9,
      tripsCount: 320,
      experience: 4,
      languages: ['FR', 'EN', 'Wolof'],
      certifications: ['Certifié VTC', 'Éco-conduite'],
      specialties: ['Éco-responsable', 'Longue distance'],
      status: 'available',
    },
  },
  {
    id: 3,
    label: 'Tesla Model X',
    type: 'suv',
    image: '/cars/cef2b6af2c.jpg',
    price: 20,
    passengers: 7,
    luggage: 4,
    description: 'Véhicules 100% électrique (Tesla, BYD...)',
    features: ['100% Électrique', '7 places', 'Autopilot', 'Portes papillon', 'Wi-Fi', 'Climatisation', 'GPS', 'Écran tactile', 'Chargement sans fil', 'Système audio premium', 'Caméra de recul', 'Sièges en cuir'],
    fuelType: 'Électrique',
    year: 2023,
    driver: {
      name: 'Ibrahima Sarr',
      rating: 4.7,
      tripsCount: 280,
      experience: 6,
      languages: ['FR', 'EN', 'Wolof', 'AR'],
      certifications: ['Certifié VTC', 'Premiers secours'],
      specialties: ['Familles', 'Groupes', 'Longue distance'],
      status: 'available',
    },
  },
  {
    id: 4,
    label: 'Range Rover',
    type: '4x4',
    image: '/cars/93d4fcebfa.jpg',
    price: 35,
    passengers: 5,
    luggage: 4,
    description: 'Véhicule tout-terrain robuste et fiable',
    features: ['4x4 permanent', 'Sièges en cuir', 'Système audio premium', 'GPS', 'Climatisation', 'Bluetooth', 'Caméra de recul', 'Régulateur de vitesse', 'Aide au stationnement', 'Éclairage LED', 'Chargeur USB', 'Toit panoramique'],
    fuelType: 'Diesel',
    year: 2021,
    driver: {
      name: 'Ousmane Ndiaye',
      rating: 4.9,
      tripsCount: 520,
      experience: 8,
      languages: ['FR', 'EN', 'Wolof'],
      certifications: ['Certifié VTC', 'Conduite tout-terrain'],
      specialties: ['Tout-terrain', 'Zones rurales', 'Aventure'],
      status: 'available',
    },
  },
  {
    id: 5,
    label: 'Mercedes V-Class',
    type: 'van',
    image: '/cars/62e070ed9a.jpg',
    price: 40,
    passengers: 8,
    luggage: 6,
    description: 'Idéal pour les voyages en famille ou entre amis',
    features: ['8 places', 'Grand espace', 'Climatisation', 'GPS', 'Sièges confortables', 'Grand coffre', 'Bluetooth', 'Système audio premium', 'Caméra de recul', 'Régulateur de vitesse', 'Chargeur USB', 'Éclairage LED'],
    fuelType: 'Diesel',
    year: 2022,
    driver: {
      name: 'Cheikh Fall',
      rating: 4.8,
      tripsCount: 380,
      experience: 7,
      languages: ['FR', 'EN', 'Wolof'],
      certifications: ['Certifié VTC', 'Transport de groupe'],
      specialties: ['Groupes', 'Événements', 'Familles'],
      status: 'available',
    },
  },
  {
    id: 6,
    label: 'Van Access',
    type: 'van',
    image: '/cars/a4b3ecb258.jpg',
    price: 40,
    passengers: 6,
    luggage: 4,
    description: 'Véhicule adapté aux personnes à mobilité réduite, avec rampe ou élévateur',
    features: ['6 places', 'Rampe d\'accès', 'Élévateur', 'Sièges adaptés', 'Climatisation', 'GPS', 'Bluetooth', 'Système audio premium', 'Caméra de recul', 'Régulateur de vitesse', 'Chargeur USB', 'Aide au stationnement'],
    fuelType: 'Diesel',
    year: 2023,
    driver: {
      name: 'Fatou Diop',
      rating: 5.0,
      tripsCount: 290,
      experience: 5,
      languages: ['FR', 'EN', 'Wolof'],
      certifications: ['Certifié VTC', 'Accessibilité PMR'],
      specialties: ['Accessibilité', 'PMR', 'Médical'],
      status: 'available',
    },
  },
];

export function FleetSection() {
  const [selectedType, setSelectedType] = useState<VehicleType>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compter les véhicules par type
  const vehicleCounts = useMemo(() => {
    return {
      all: FLEET_CATEGORIES.length,
      berline: FLEET_CATEGORIES.filter(v => v.type === 'berline').length,
      suv: FLEET_CATEGORIES.filter(v => v.type === 'suv').length,
      '4x4': FLEET_CATEGORIES.filter(v => v.type === '4x4').length,
      van: FLEET_CATEGORIES.filter(v => v.type === 'van').length,
    };
  }, []);

  // Filtrer les véhicules
  const filteredVehicles = useMemo(() => {
    if (selectedType === 'all') {
      return FLEET_CATEGORIES;
    }
    return FLEET_CATEGORIES.filter((vehicle) => vehicle.type === selectedType);
  }, [selectedType]);

  return (
    <section className="bg-[#192230] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
            Véhicules{' '}
            <span className="text-primary-400">disponibles</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de véhicules haut de gamme, entretenus avec soin et conduits par des chauffeurs professionnels.
          </p>
        </div>

        {/* Filtres - Design en pilules avec compteurs */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { value: 'all', label: 'Tous' },
              { value: 'berline', label: 'Berlines' },
              { value: 'suv', label: 'SUV' },
              { value: '4x4', label: '4x4' },
              { value: 'van', label: 'Vans' },
            ].map((type) => {
              const isActive = selectedType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value as VehicleType)}
                  className={`
                    inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm'
                    }
                  `}
                >
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fleet Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredVehicles.map((category) => (
              <div
                key={category.id}
                className="group bg-[#1e2a3a] rounded-xl overflow-hidden hover:shadow-lg hover:bg-[#253141] transition-all duration-300 border border-white/10"
              >
                {/* Image with dark background */}
                <div className="relative aspect-[4/3] bg-[#192230] flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Content - Dark section with hover effect */}
                <div className="bg-transparent group-hover:bg-white/5 p-6 transition-colors duration-300">
                  {/* Title with capacity badges */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white flex-1">
                      {category.label}
                    </h3>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      {/* Passengers badge */}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-500/20 text-secondary-400 text-xs border border-secondary-500/30">
                        <Users className="w-3 h-3 text-secondary-400" />
                        <span className="font-normal text-secondary-400">{category.passengers}</span>
                      </div>
                      {/* Luggage badge */}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-500/20 text-secondary-400 text-xs border border-secondary-500/30">
                        <Luggage className="w-3 h-3 text-secondary-400" />
                        <span className="font-normal text-secondary-400">{category.luggage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <p className="text-sm font-normal text-gray-300">
                      À partir de {category.price}€
                    </p>
                  </div>

                  {/* Description - becomes yellow on hover */}
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:bg-secondary-500/20 group-hover:text-secondary-400 group-hover:px-3 group-hover:py-2 rounded-md transition-all duration-300 inline-block mb-4">
                    {category.description}
                  </p>

                  {/* En savoir plus button - minimaliste */}
                  <button
                    onClick={() => {
                      setSelectedVehicle(category);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-secondary-400 hover:text-secondary-300 hover:bg-secondary-500/20 rounded-lg transition-all duration-300 group/btn border border-secondary-500/30"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">Aucun véhicule ne correspond à vos critères</p>
            <button
              onClick={() => setSelectedType('all')}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <VehicleModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVehicle(null);
        }}
      />
    </section>
  );
}
