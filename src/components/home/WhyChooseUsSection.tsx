import React from 'react';
import Link from 'next/link';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-white">
      {/* Top Banner - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[480px]">
        {/* Left - Dark Content Box */}
        <div className="bg-[#282c34] flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
          <span className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
            <span className="w-2 h-2 bg-secondary-500 rounded-sm" aria-hidden />
            Pourquoi nous choisir
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4 uppercase">
            Les avantages de faire confiance à scod vtc
          </h2>
          <p className="text-white text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 max-w-xl text-justify">
            Réservez votre VTC en toute sérénité : chauffeur confirmé à l&apos;avance, suivi en temps réel, prise en charge garantie à l&apos;heure. En cas de retard de vol à l&apos;aéroport AIBD, nous nous adaptons sans frais. Nos tarifs fixes s&apos;affichent en FCFA dès la réservation, sans surfacturation liée aux embouteillages de Dakar. Le prix reste garanti, même plusieurs semaines à l&apos;avance.
            <br /><br />
            Nos chauffeurs expérimentés et nos véhicules premium climatisés vous garantissent un confort irréprochable à Dakar, Thiès et Saly. Pour vos déplacements professionnels ou familiaux, vous méritez le meilleur service.
          </p>
          <Link
            href="/booking/new"
            className="inline-flex items-center gap-2 text-white text-sm sm:text-base font-medium hover:text-secondary-500 transition-colors group"
          >
            Découvrez nos services
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
          </Link>
        </div>

        {/* Right - Image fond (Sécurité Véhicule - flotte scod vtc) */}
        <div
          className="relative flex items-center justify-center min-h-[400px] lg:min-h-[480px] lg:rounded-br-[20%] overflow-hidden bg-gray-400"
          style={{
            backgroundImage: "url('/cars/nos avantages.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          role="img"
          aria-label="Flotte de véhicules scod vtc - Sécurité véhicule"
        />
      </div>
    </section>
  );
};

export { WhyChooseUsSection };
