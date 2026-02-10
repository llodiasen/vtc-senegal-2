import React from 'react';
import HomeHeader from '@/components/layout/HomeHeader';
import { BookingSection, FleetSection, ValuePropositionSection, FeatureCardsSection, SolutionsSection, EnterpriseSolutionsSection, WhyChooseUsSection, ContactSection } from '@/components/home';

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <div className="min-h-screen">
      {/* First section with background image - optimisée pour les performances */}
      <section
        className="relative min-h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/vtc-senegal.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        
        {/* Content avec z-index pour être au-dessus de l'overlay */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <BookingSection />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Trois cartes de fonctionnalités */}
      <FeatureCardsSection />

      {/* Section Notre Flotte - Véhicules Premium */}
      <section id="flotte" className="scroll-mt-20">
        <FleetSection />
      </section>

      {/* Section Proposition de valeur */}
      <ValuePropositionSection />

      {/* Section Solutions adaptées à tous vos besoins */}
      <SolutionsSection />

      {/* Solutions transport pour entreprises */}
      <EnterpriseSolutionsSection />

      {/* Pourquoi nous choisir ? */}
      <WhyChooseUsSection />

      {/* Section Contactez-nous */}
      <ContactSection />
    </div>
    </>
  );
}
