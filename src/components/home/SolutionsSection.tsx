'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'aeroport',
    image: '/cars/7ac99ba95b.jpg',
    title: 'Transfert Aéroport',
    description: 'Service navette entre Dakar et l\'aéroport AIBD',
    chip: '45-60 min',
    features: [
      'Tarif fixe garanti',
      'Suivi de vol en temps réel',
      'Accueil personnalisé',
      'Véhicule climatisé',
    ],
    price: '25,000 FCFA',
    popular: true,
  },
  {
    id: 'professionnel',
    image: '/cars/93d4fcebfa.jpg',
    title: 'Transport Professionnel',
    description: 'Déplacements d\'affaires, réunions, rendez-vous clients',
    chip: 'Flexible',
    features: [
      'Véhicules haut de gamme',
      'Chauffeurs en costume',
      'Ponctualité garantie',
      'Discrétion assurée',
    ],
    price: 'À partir de 10,000 FCFA/heure',
    popular: false,
  },
  {
    id: 'familial',
    image: '/cars/cef2b6af2c.jpg',
    title: 'Transport Familial',
    description: 'Sorties en famille, courses, visites médicales',
    chip: 'Flexible',
    features: [
      'Véhicules spacieux',
      'Sièges enfants disponibles',
      'Flexibilité horaire',
      'Tarifs préférentiels',
    ],
    price: 'À partir de 35,000 FCFA/heure',
    popular: false,
  },
  {
    id: 'occasions',
    image: '/cars/62e070ed9a.jpg',
    title: 'Occasions Spéciales',
    description: 'Mariages, anniversaires, événements privés',
    chip: 'Sur mesure',
    features: [
      'Véhicules décorés',
      'Service personnalisé',
      'Photographe disponible',
      'Forfaits sur mesure',
    ],
    price: 'À partir de 45,000 FCFA/jour',
    popular: false,
  },
  {
    id: 'inter-regions',
    image: '/cars/a4b3ecb258.jpg',
    title: 'Navette Inter-régions',
    description: 'Transport vers les principales villes du Sénégal',
    chip: 'Variable',
    features: [
      'Destinations multiples',
      'Véhicules confortables',
      'Arrêts sur demande',
      'Bagages inclus',
    ],
    price: 'À partir de 40,000 FCFA',
    popular: false,
  },
  {
    id: 'disposition',
    image: '/cars/1.webp',
    title: 'Mise à disposition',
    description: 'Chauffeur et véhicule à votre disposition',
    chip: 'Minimum 2h',
    features: [
      'Disponibilité totale',
      'Itinéraire flexible',
      'Attente incluse',
      'Plusieurs arrêts possibles',
    ],
    price: 'À partir de 10,000 FCFA/heure',
    popular: false,
  },
];

export function SolutionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3; // Desktop: 3 cards
  const maxIndex = Math.max(0, SERVICES.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="services" className="bg-gray-50/30 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Solutions adaptées à tous vos{' '}
            <span className="text-primary-600">besoins</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            De l&apos;aéroport aux événements spéciaux, en passant par vos
            déplacements quotidiens, nous avons la solution de transport qui vous
            convient.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Slider Wrapper */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                gap: '1.5rem',
              }}
            >
              {SERVICES.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="group relative bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0"
                    style={{
                      width: `calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})`,
                      minWidth: `calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})`,
                    }}
                  >
                    {/* Populaire tag */}
                    {service.popular && (
                      <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold">
                        Populaire
                      </span>
                    )}

                    {/* Image section */}
                    <div className="relative aspect-[4/3] bg-transparent flex items-center justify-center overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content - White section with hover effect */}
                    <div className="bg-transparent group-hover:bg-gray-50/30 p-6 transition-colors duration-300">
                      {/* Title */}
                      <div className="mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description - becomes yellow on hover */}
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:bg-secondary-100 group-hover:text-primary-600 group-hover:px-3 group-hover:py-2 rounded-md transition-all duration-300 inline-block mb-3">
                        {service.description}
                      </p>

                      {/* Chip */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-gray-700 text-xs font-medium">
                          <Clock className="w-3.5 h-3.5 text-primary-600" />
                          {service.chip}
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Price */}
                      <div className="mb-4">
                        <p className="text-sm font-normal text-gray-700">
                          {service.price}
                        </p>
                      </div>

                      {/* En savoir plus button - minimaliste */}
                      <Link
                        href="/booking/new"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-all duration-300 group/btn"
                      >
                        <span>Contactez-nous pour réserver</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300" aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
