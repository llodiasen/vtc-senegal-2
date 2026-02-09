import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Clock, DollarSign, Users, Star, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pourquoi scod vtc - scod vtc',
  description: 'Découvrez pourquoi scod vtc est le leader du transport avec chauffeur au Sénégal',
};

export default function PourquoiVTCPage() {
  const features = [
    {
      icon: Shield,
      title: 'Sécurité garantie',
      description: 'Tous nos chauffeurs sont vérifiés et nos véhicules sont régulièrement inspectés pour votre sécurité',
    },
    {
      icon: Clock,
      title: 'Ponctualité assurée',
      description: 'Réservez à l\'avance ou en temps réel, nos chauffeurs sont toujours à l\'heure',
    },
    {
      icon: DollarSign,
      title: 'Prix transparents',
      description: 'Connaissez le prix exact de votre course avant de réserver, sans frais cachés',
    },
    {
      icon: Users,
      title: 'Service premium',
      description: 'Chauffeurs professionnels, véhicules confortables et service client disponible 24/7',
    },
    {
      icon: Star,
      title: 'Qualité certifiée',
      description: 'Note moyenne de 4.8/5 basée sur plus de 50 000 courses effectuées',
    },
    {
      icon: MapPin,
      title: 'Couverture nationale',
      description: 'Disponible à Dakar, Thiès, Saint-Louis et dans toutes les grandes villes du Sénégal',
    },
  ];

  const stats = [
    { value: '50 000+', label: 'Courses effectuées' },
    { value: '5 000+', label: 'Clients satisfaits' },
    { value: '200+', label: 'Chauffeurs partenaires' },
    { value: '4.8/5', label: 'Note moyenne' },
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
              Pourquoi choisir scod vtc ?
            </h1>
            <p className="text-xl text-primary-50">
              Le leader du transport avec chauffeur au Sénégal. Qualité, sécurité et ponctualité à chaque course.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Nos avantages
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Ce que disent nos clients
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Amadou Diop',
                role: 'Client régulier',
                comment: 'Service impeccable ! Les chauffeurs sont toujours ponctuels et professionnels.',
                rating: 5,
              },
              {
                name: 'Fatou Sall',
                role: 'Cliente entreprise',
                comment: 'Nous utilisons scod vtc pour tous nos déplacements professionnels. Très satisfaits !',
                rating: 5,
              },
              {
                name: 'Moussa Ndiaye',
                role: 'Voyageur fréquent',
                comment: 'Application facile à utiliser, prix transparents et véhicules toujours propres.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à réserver votre prochaine course ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Téléchargez l&apos;application ou réservez directement en ligne
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking/new"
              className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Réserver maintenant
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
