import React from 'react';
import Link from 'next/link';

const ValuePropositionSection = () => {
  return (
    <section className="bg-white">
      {/* Top Banner - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[480px]">
        {/* Left - Dark Content Box */}
        <div className="bg-[#282c34] flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <span className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <span className="w-2 h-2 bg-secondary-500 rounded-sm" aria-hidden />
            Toujours à l&apos;heure, partout
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Aller loin commence par arriver à l&apos;heure
          </h2>
          <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
            Vous partez en déplacement pro ou en vacances en famille ? Avec scod vtc,
            chaque course est planifiée pour vous garantir sérénité et ponctualité.
            Réservez un taxi ou VTC partout au Sénégal, avec un chauffeur confirmé à
            l&apos;avance, un prix fixe et transparent, une prise en charge même en cas
            de retard de votre vol, sans frais supplémentaires.
          </p>
          <Link
            href="/booking/new"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-secondary-500 transition-colors group"
          >
            Planifiez votre trajet dès maintenant
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
          </Link>
        </div>

        {/* Right - Image fond (Sécurité Véhicule - flotte scod vtc) */}
        <div
          className="relative flex items-center justify-center min-h-[400px] lg:min-h-[480px] lg:rounded-br-[20%] overflow-hidden bg-gray-400"
          style={{
            backgroundImage: "url('/securite-vehicule.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          role="img"
          aria-label="Flotte de véhicules scod vtc - Sécurité véhicule"
        />
      </div>

      {/* Bottom - Three Feature Cards */}
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
            <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">
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
            <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">
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
            <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">
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
};

export default ValuePropositionSection;
