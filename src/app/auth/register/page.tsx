import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inscription - scod vtc',
  description: 'Créez votre compte scod vtc',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Créer un compte
            </h1>
            <p className="text-gray-600">
              Rejoignez scod vtc
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-primary-800 text-center">
              🚧 Page d&apos;inscription en construction
            </p>
            <p className="text-xs text-primary-600 text-center mt-2">
              Cette page sera bientôt disponible
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Jean Dupont"
                disabled
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="jean.dupont@example.com"
                disabled
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="+221 XX XXX XX XX"
                disabled
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
                disabled
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
              disabled
            >
              S&apos;inscrire (Bientôt disponible)
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link
                href="/auth/login"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
