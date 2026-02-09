import React from 'react';
import Link from 'next/link';
import {
  Plane,
  Briefcase,
  Users,
  Heart,
  MapPin,
  Clock,
  Check,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'aeroport',
    icon: Plane,
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
    icon: Briefcase,
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
    icon: Users,
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
    icon: Heart,
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
    icon: MapPin,
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
    icon: Clock,
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
  return (
    <section id="services" className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-gray-700 text-sm font-medium border border-primary-100 mb-6">
            Nos Services de Transport
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Solutions adaptées à tous vos besoins
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            De l&apos;aéroport aux événements spéciaux, en passant par vos
            déplacements quotidiens, nous avons la solution de transport qui vous
            convient.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col hover:shadow-xl transition-shadow"
              >
                {/* Populaire tag */}
                {service.popular && (
                  <span className="absolute -top-2 left-4 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold">
                    Populaire
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" aria-hidden />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* Chip */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-gray-700 text-xs font-medium w-fit mb-4">
                  <Clock className="w-3.5 h-3.5 text-primary-600" />
                  {service.chip}
                </span>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
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
                <p className="text-xl font-bold text-primary-600 mb-2">
                  {service.price}
                </p>
                <Link
                  href="/booking/new"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contactez-nous pour réserver
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
