'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type ServiceType = 'particulier' | 'entreprise';

const ALL_SERVICES = [
  // Services Particuliers
  {
    id: 'aeroport',
    type: 'particulier' as ServiceType,
    image: '/cars/Transfert Aéroport.jpg',
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
    cta: 'Contactez-nous pour réserver',
    ctaLink: '/booking/new',
  },
  {
    id: 'professionnel',
    type: 'particulier' as ServiceType,
    image: '/cars/Transport Professionnel.jpg',
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
    cta: 'Contactez-nous pour réserver',
    ctaLink: '/booking/new',
  },
  {
    id: 'familial',
    type: 'particulier' as ServiceType,
    image: '/cars/Transport Familial.jpg',
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
    cta: 'Contactez-nous pour réserver',
    ctaLink: '/booking/new',
  },
  {
    id: 'occasions',
    type: 'particulier' as ServiceType,
    image: '/cars/Occasions Spéciales.jpg',
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
    cta: 'Contactez-nous pour réserver',
    ctaLink: '/booking/new',
  },
  {
    id: 'inter-regions',
    type: 'particulier' as ServiceType,
    image: '/cars/Navette Inter-régions.jpg',
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
    cta: 'Contactez-nous pour réserver',
    ctaLink: '/booking/new',
  },
  {
    id: 'disposition',
    type: 'particulier' as ServiceType,
    image: '/cars/Mise à disposition.jpg',
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
    cta: 'Contactez-nous pour réserver',
    ctaLink: '/booking/new',
  },
  // Services Entreprise
  {
    id: 'personnel',
    type: 'entreprise' as ServiceType,
    image: '/cars/Transport du personnel.jpg',
    title: 'Transport du personnel',
    description: 'Solutions de transport pour vos équipes',
    chip: 'Mensuel',
    features: [
      'Navettes régulières',
      'Horaires flexibles',
      'Véhicules adaptés',
      'Suivi en temps réel',
    ],
    price: 'À partir de 150 000 FCFA/mois',
    popular: false,
    cta: 'Demandez un devis personnalisé',
    ctaLink: '/#contact',
  },
  {
    id: 'chauffeurs',
    type: 'entreprise' as ServiceType,
    image: '/cars/Placement de chauffeurs.jpg',
    title: 'Placement de chauffeurs',
    description: 'Chauffeurs dédiés pour vos dirigeants',
    chip: 'Mensuel',
    features: [
      'Chauffeurs expérimentés',
      'Formation protocole',
      'Disponibilité totale',
      'Véhicules de prestige',
    ],
    price: 'À partir de 200 000 FCFA/mois',
    popular: false,
    cta: 'Demandez un devis personnalisé',
    ctaLink: '/#contact',
  },
  {
    id: 'vip',
    type: 'entreprise' as ServiceType,
    image: '/cars/Navettes VIP.jpg',
    title: 'Navettes VIP',
    description: 'Service premium pour événements d\'entreprise',
    chip: 'Sur mesure',
    features: [
      'Véhicules haut de gamme',
      'Service personnalisé',
      'Accueil protocolaire',
      'Coordination événements',
    ],
    price: 'Sur devis personnalisé',
    popular: false,
    cta: 'Demandez un devis personnalisé',
    ctaLink: '/#contact',
  },
  {
    id: 'location',
    type: 'entreprise' as ServiceType,
    image: '/cars/Location flexible.jpg',
    title: 'Location flexible',
    description: 'Solutions adaptées à vos besoins ponctuels',
    chip: 'Flexible',
    features: [
      'Réservation à la demande',
      'Facturation mensuelle',
      'Contrats sur mesure',
      'Support dédié',
    ],
    price: 'Tarifs préférentiels',
    popular: false,
    cta: 'Demandez un devis personnalisé',
    ctaLink: '/#contact',
  },
];

export function UnifiedSolutionsSection() {
  const [filter, setFilter] = useState<ServiceType>('particulier');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Responsive cards per view
  const [cardsPerView, setCardsPerView] = useState(3);
  
  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(3); // Desktop: 3 cards
      }
    };
    
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Filtrer les services selon le type sélectionné
  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((service) => service.type === filter);
  }, [filter]);

  const maxIndex = Math.max(0, filteredServices.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Réinitialiser l'index quand on change de filtre
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  return (
    <section id="services" className="bg-gray-50/30 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Solutions adaptées à tous vos{' '}
            <span className="text-primary-600">besoins</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            De l&apos;aéroport aux événements spéciaux, en passant par vos
            déplacements quotidiens, nous avons la solution de transport qui vous
            convient.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setFilter('particulier')}
              className={`px-4 py-1.5 rounded-md font-medium text-sm transition-all duration-300 ${
                filter === 'particulier'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Particulier
            </button>
            <button
              onClick={() => setFilter('entreprise')}
              className={`px-4 py-1.5 rounded-md font-medium text-sm transition-all duration-300 ${
                filter === 'entreprise'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Entreprise
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:-translate-x-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:translate-x-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
              {filteredServices.map((service) => {
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
                      <div className={`mb-4 ${filter === 'entreprise' ? 'pt-4 border-t border-gray-100' : ''}`}>
                        <p className="text-sm font-normal text-gray-700 mb-2">
                          {service.price}
                        </p>
                        <Link
                          href={service.ctaLink}
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
