import React from 'react';
import Link from 'next/link';
import { Briefcase, UserCircle, Star, Building2, Check } from 'lucide-react';

const ENTERPRISE_SERVICES = [
  {
    id: 'personnel',
    icon: Briefcase,
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
  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-lg border border-primary-200 bg-white text-gray-600 text-sm font-medium">
            Services aux entreprises
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Solutions transport{' '}
            <span className="text-primary-600">pour entreprises</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Optimisez la mobilité de votre entreprise avec nos solutions sur mesure.
            Transport du personnel, chauffeurs dédiés et services VIP.
          </p>
        </div>

        {/* Cards 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ENTERPRISE_SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.subtitle}</p>

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

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-primary-600 mb-1">
                    {service.price}
                  </p>
                  <Link
                    href="/#contact"
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {service.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
