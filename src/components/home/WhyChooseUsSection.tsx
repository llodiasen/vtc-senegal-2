import React from 'react';
import { CheckCircle, Clock, Award } from 'lucide-react';

const ADVANTAGES = [
  {
    id: 'fiabilite',
    icon: CheckCircle,
    title: 'Fiabilité',
    description: 'Service garanti 365 jours par an',
  },
  {
    id: 'ponctualite',
    icon: Clock,
    title: 'Ponctualité',
    description: 'Respect strict des horaires convenus',
  },
  {
    id: 'qualite',
    icon: Award,
    title: 'Qualité',
    description: 'Véhicules entretenus et chauffeurs formés',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pourquoi nous{' '}
            <span className="text-primary-600">choisir?</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Les avantages de faire confiance à scod vtc pour vos besoins de
            transport d&apos;entreprise.
          </p>
        </div>

        {/* Cards 1x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ADVANTAGES.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-white" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
