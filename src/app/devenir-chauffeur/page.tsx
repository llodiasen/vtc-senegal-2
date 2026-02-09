import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Car, Clock, DollarSign, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Devenir chauffeur - scod vtc',
  description: 'Rejoignez scod vtc en tant que chauffeur partenaire et bénéficiez d\'une rémunération attractive',
};

export default function DevenirChauffeurPage() {
  const advantages = [
    {
      icon: DollarSign,
      title: 'Revenus attractifs',
      description: 'Gagnez jusqu\'à 300 000 FCFA par mois avec des tarifs compétitifs',
    },
    {
      icon: Clock,
      title: 'Flexibilité totale',
      description: 'Choisissez vos horaires et travaillez quand vous le souhaitez',
    },
    {
      icon: Shield,
      title: 'Assurance incluse',
      description: 'Bénéficiez d\'une couverture complète pour vous et vos passagers',
    },
    {
      icon: Car,
      title: 'Support technique',
      description: 'Assistance 24/7 et support pour l\'entretien de votre véhicule',
    },
  ];

  const requirements = [
    'Permis de conduire valide (catégorie B minimum)',
    'Véhicule en bon état (moins de 8 ans)',
    'Carte grise à votre nom ou autorisation du propriétaire',
    'Assurance professionnelle VTC',
    'Casier judiciaire vierge',
    'Attestation de formation VTC',
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Devenez chauffeur partenaire scod vtc
            </h1>
            <p className="text-xl text-primary-50 mb-8">
              Rejoignez le plus grand réseau de VTC au Sénégal et profitez d&apos;une activité flexible et rémunératrice
            </p>
            <Link
              href="/auth/register?type=driver"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Commencer mon inscription
            </Link>
          </div>
        </div>
      </div>

      {/* Advantages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Pourquoi devenir chauffeur VTC ?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <advantage.icon className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {advantage.title}
              </h3>
              <p className="text-gray-600">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Conditions requises
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/auth/register?type=driver"
                className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Je m&apos;inscris maintenant
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Inscription gratuite • Validation sous 48h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Questions fréquentes
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: 'Combien puis-je gagner en tant que chauffeur VTC ?',
              answer: 'Vos revenus dépendent du nombre d\'heures travaillées. En moyenne, nos chauffeurs gagnent entre 200 000 et 300 000 FCFA par mois.',
            },
            {
              question: 'Ai-je besoin de mon propre véhicule ?',
              answer: 'Oui, vous devez disposer d\'un véhicule en bon état de moins de 8 ans. Nous proposons également des solutions de location avec option d\'achat.',
            },
            {
              question: 'Combien de temps prend l\'inscription ?',
              answer: 'Le processus d\'inscription prend environ 15 minutes. Une fois votre dossier complet soumis, la validation prend généralement 48h.',
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/aide"
            className="text-primary-600 font-medium hover:text-primary-700"
          >
            Voir toutes les questions →
          </Link>
        </div>
      </div>
    </main>
  );
}
