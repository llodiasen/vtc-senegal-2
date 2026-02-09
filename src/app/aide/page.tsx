import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Phone, Mail, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aide - scod vtc',
  description: 'Centre d\'aide scod vtc - Trouvez des réponses à vos questions',
};

export default function AidePage() {
  const faqCategories = [
    {
      title: 'Pour les passagers',
      icon: HelpCircle,
      questions: [
        'Comment réserver une course ?',
        'Quels sont les modes de paiement acceptés ?',
        'Comment annuler une réservation ?',
        'Politique de remboursement',
      ],
    },
    {
      title: 'Pour les chauffeurs',
      icon: HelpCircle,
      questions: [
        'Comment devenir chauffeur partenaire ?',
        'Documents requis',
        'Conditions de travail',
        'Système de paiement',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Centre d&apos;aide</h1>
          <p className="mt-2 text-lg text-gray-600">
            Comment pouvons-nous vous aider aujourd&apos;hui ?
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {faqCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {category.questions.map((question, qIndex) => (
                  <li key={qIndex}>
                    <button className="text-left text-gray-700 hover:text-primary-600 transition-colors">
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Besoin d&apos;aide supplémentaire ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600 text-sm mb-3">
                Disponible 24/7
              </p>
              <a
                href="tel:+221123456789"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                +221 12 345 67 89
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <Mail className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">
                Réponse sous 24h
              </p>
              <a
                href="mailto:support@vtc-senegal.com"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                support@vtc-senegal.com
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Chat en direct</h3>
              <p className="text-gray-600 text-sm mb-3">
                Assistance instantanée
              </p>
              <button className="text-primary-600 font-medium hover:text-primary-700">
                Démarrer une conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
