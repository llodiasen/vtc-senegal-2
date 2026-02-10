'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, UserCircle, Star, Building2, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const ENTERPRISE_SERVICES = [
  {
    id: 'personnel',
    icon: Briefcase,
    image: '/cars/Transport du personnel.jpg',
    title: 'Transport du personnel',
    subtitle: 'Solutions de transport pour vos équipes',
    features: [
      'Navettes régulières',
      'Horaires flexibles',
      'Véhicules adaptés',
      'Suivi en temps réel',
    ],
    price: 'À partir de 150 000 FCFA/mois',
    cta: 'Demandez un devis personnalisé',
  },
  {
    id: 'chauffeurs',
    icon: UserCircle,
    image: '/cars/Placement de chauffeurs.jpg',
    title: 'Placement de chauffeurs',
    subtitle: 'Chauffeurs dédiés pour vos dirigeants',
    features: [
      'Chauffeurs expérimentés',
      'Formation protocole',
      'Disponibilité totale',
      'Véhicules de prestige',
    ],
    price: 'À partir de 200 000 FCFA/mois',
    cta: 'Demandez un devis personnalisé',
  },
  {
    id: 'vip',
    icon: Star,
    image: '/cars/Navettes VIP.jpg',
    title: 'Navettes VIP',
    subtitle: 'Service premium pour événements d\'entreprise',
    features: [
      'Véhicules haut de gamme',
      'Service personnalisé',
      'Accueil protocolaire',
      'Coordination événements',
    ],
    price: 'Sur devis personnalisé',
    cta: 'Demandez un devis personnalisé',
  },
  {
    id: 'location',
    icon: Building2,
    image: '/cars/Location flexible.jpg',
    title: 'Location flexible',
    subtitle: 'Solutions adaptées à vos besoins ponctuels',
    features: [
      'Réservation à la demande',
      'Facturation mensuelle',
      'Contrats sur mesure',
      'Support dédié',
    ],
    price: 'Tarifs préférentiels',
    cta: 'Demandez un devis personnalisé',
  },
];

export function EnterpriseSolutionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3; // Desktop: 3 cards
  const maxIndex = Math.max(0, ENTERPRISE_SERVICES.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Solutions transport pour{' '}
            <span className="text-primary-600">entreprises</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Optimisez la mobilité de votre entreprise avec nos solutions sur mesure.
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
              {ENTERPRISE_SERVICES.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0"
                    style={{
                      width: `calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})`,
                      minWidth: `calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})`,
                    }}
                  >
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
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:bg-secondary-100 group-hover:text-primary-600 group-hover:px-3 group-hover:py-2 rounded-md transition-all duration-300 inline-block mb-4">
                        {service.subtitle}
                      </p>

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
                      <div className="mb-4 pt-4 border-t border-gray-100">
                        <p className="text-sm font-normal text-gray-700 mb-2">
                          {service.price}
                        </p>
                        <Link
                          href="/#contact"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-all duration-300 group/btn"
                        >
                          <span>{service.cta}</span>
                          <span className="group-hover/btn:translate-x-1 transition-transform duration-300" aria-hidden>→</span>
                        </Link>
                      </div>
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
