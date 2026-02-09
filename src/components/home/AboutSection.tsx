import React from 'react';
import {
  Users,
  Car,
  Star,
  Clock,
  Shield,
  DollarSign,
  Headphones,
} from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '500+',
    label: 'Clients satisfaits',
  },
  {
    icon: Car,
    value: '50+',
    label: 'Véhicules disponibles',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Note moyenne',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Service disponible',
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: 'Sécurité Garantie',
    description:
      'Véhicules assurés et chauffeurs professionnels certifiés pour votre tranquillité d\'esprit.',
  },
  {
    icon: DollarSign,
    title: 'Tarifs Transparents',
    description:
      'Prix fixes annoncés à l\'avance, sans frais cachés ni mauvaises surprises.',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description:
      'Équipe d\'assistance disponible à tout moment pour répondre à vos besoins.',
  },
];

export function AboutSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 text-gray-700 text-sm font-medium border border-primary-100">
            <span className="w-4 h-4 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </span>
            À propos de scod vtc
          </span>
        </div>

        {/* Main heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Votre partenaire <span className="text-primary-600">mobilité</span>{' '}
            au Sénégal
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Service VTC premium avec des chauffeurs professionnels et des
            véhicules de qualité pour tous vos déplacements.
          </p>
        </div>

        {/* Stats grid - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {STATS.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-white" aria-hidden />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Features grid - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission card - dark blue */}
        <div className="bg-primary-600 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0">
            <Star className="w-7 h-7 text-white" aria-hidden />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Notre Mission
            </h3>
            <p className="text-white/95 text-base sm:text-lg leading-relaxed">
              Faciliter vos déplacements au Sénégal en vous proposant des
              solutions de transport{' '}
              <span className="font-bold text-white">sûres</span>,{' '}
              <span className="font-bold text-white">confortables</span> et{' '}
              <span className="font-bold text-white">professionnelles</span>.
              Votre satisfaction est notre priorité absolue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
