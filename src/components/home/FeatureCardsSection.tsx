import React from 'react';
import Link from 'next/link';

export function FeatureCardsSection() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 lg:p-8 flex flex-col">
            <span className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <span className="w-2 h-2 bg-secondary-500 rounded-sm" aria-hidden />
              Votre chauffeur, où que vous soyez
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              Un chauffeur fiable, partout au Sénégal
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1 text-justify">
              Que vous soyez à Dakar, Thiès, Saint-Louis ou dans une autre ville,
              nos chauffeurs vous conduisent à votre destination. Trajets
              professionnels, vacances ou déplacements médicaux : notre réseau vous
              permet de réserver un chauffeur fiable où que vous soyez.
            </p>
            <Link
              href="/booking/new"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-primary-600 transition-colors group"
            >
              Planifiez vos trajets vers la gare ou l&apos;aéroport dès maintenant
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 lg:p-8 flex flex-col">
            <span className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <span className="w-2 h-2 bg-secondary-500 rounded-sm" aria-hidden />
              On s&apos;adapte à vous
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              Votre chauffeur vous attend, pas l&apos;inverse
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1 text-justify">
              Chez scod vtc, votre planning est notre priorité. Réservez vos
              trajets à toute heure, même plusieurs mois à l&apos;avance. Un changement
              de dernière minute ? Modifiez ou annulez sans frais. Votre vol a du
              retard ? Nous ajustons automatiquement l&apos;arrivée de votre chauffeur.
            </p>
            <Link
              href="/pourquoi-scod-vtc"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-primary-600 transition-colors group"
            >
              Découvrez pourquoi scod vtc fait la différence
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 lg:p-8 flex flex-col">
            <span className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <span className="w-2 h-2 bg-secondary-500 rounded-sm" aria-hidden />
              Voyagez l&apos;esprit tranquille
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              Zéro stress. Zéro mauvaise surprise
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1 text-justify">
              Dès votre réservation, nous vous confirmons votre chauffeur. Vous
              pouvez suivre son arrivée en temps réel et le contacter à tout moment.
              Plus besoin de douter : pas d&apos;annulation de dernière minute, pas
              d&apos;absence au départ. Avec scod vtc, vous voyagez l&apos;esprit
              tranquille.
            </p>
            <Link
              href="/booking/new"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-primary-600 transition-colors group"
            >
              Réservez votre VTC aujourd&apos;hui, partez l&apos;esprit libre
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
