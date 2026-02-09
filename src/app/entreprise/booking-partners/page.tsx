import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Booking Partners - scod vtc',
  description: 'Partenariats avec les plateformes de réservation',
};

export default function BookingPartnersPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Partners
          </h1>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <p className="text-primary-800 font-medium">
              🚧 Page en construction
            </p>
            <p className="text-primary-600 text-sm mt-2">
              Cette page sera bientôt disponible
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
