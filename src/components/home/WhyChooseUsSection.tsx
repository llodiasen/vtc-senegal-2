import React from 'react';
import Link from 'next/link';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-white">
      {/* Top Banner - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[480px]">
        {/* Left - Dark Content Box */}
        <div className="bg-[#282c34] flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <span className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <span className="w-2 h-2 bg-secondary-500 rounded-sm" aria-hidden />
            Pourquoi nous choisir
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            Les avantages de faire confiance à scod vtc
          </h2>
          <p className="text-white text-sm sm:text-base leading-relaxed mb-6 max-w-xl text-justify">
            Les avantages de faire confiance à scod vtc pour vos besoins de
            transport d&apos;entreprise. Service garanti 365 jours par an, respect strict des horaires convenus, véhicules entretenus et chauffeurs formés.
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
