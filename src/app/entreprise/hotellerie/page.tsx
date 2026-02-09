import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Hotel, Clock, Shield, Users, Star, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solutions Hôtellerie - scod vtc',
  description: 'Solutions de transport sur mesure pour les hôtels et établissements d\'hébergement',
};

export default function HotelleriePage() {
  const features = [
    {
      icon: Clock,
      title: 'Service 24/7',
      description: 'Disponible jour et nuit pour vos clients',
    },
    {
      icon: Shield,
      title: 'Fiabilité garantie',
      description: 'Chauffeurs professionnels et véhicules premium',
    },
    {
      icon: Users,
      title: 'Gestion centralisée',
      description: 'Tableau de bord dédié pour gérer toutes les courses',
    },
    {
      icon: Star,
      title: 'Expérience premium',
      description: 'Service haut de gamme pour vos clients VIP',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Hotel className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Solutions pour l&apos;Hôtellerie
              </h1>
            </div>
            <p className="text-xl text-primary-50">
              Offrez à vos clients un service de transport premium avec scod vtc
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Pourquoi nous choisir ?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <feature.icon className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nos services pour votre hôtel
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Transferts aéroport
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Accueil personnalisé avec pancarte</li>
                <li>✓ Suivi des vols en temps réel</li>
                <li>✓ Véhicules premium climatisés</li>
                <li>✓ Assistance bagages</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Service conciergerie
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Réservation facile via téléphone ou app</li>
                <li>✓ Facturation centralisée</li>
                <li>✓ Rapport mensuel détaillé</li>
                <li>✓ Support dédié 24/7</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Événements & Séminaires
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Gestion de groupes</li>
                <li>✓ Planning personnalisé</li>
                <li>✓ Coordinateur dédié</li>
                <li>✓ Tarifs préférentiels volume</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Visites touristiques
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Chauffeurs guides multilingues</li>
                <li>✓ Circuits personnalisables</li>
                <li>✓ Véhicules confortables</li>
                <li>✓ Tarification à la journée</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Intéressé par nos services ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez notre équipe commerciale pour établir un partenariat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+221778223493"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Nous appeler
            </a>
            <a
              href="mailto:entreprise@vtc-senegal.com"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
