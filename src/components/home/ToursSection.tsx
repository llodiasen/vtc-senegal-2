'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star, Check, Ruler, Sparkles } from 'lucide-react';

const TOURS = [
  {
    id: 'dakar',
    title: 'Pack Découverte Dakar Intra-Muros (4H)',
    description: 'Découvrez les trésors historiques et culturels de Dakar intra-muros',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=320&fit=crop',
    duration: 'Demi-journée (4h)',
    maxPeople: 4,
    rating: 4.9,
    highlights: ['Monument de la Renaissance', 'Corniche Ouest', 'Mosquée de la Divinité', 'Plateau: Musée des Civilisations Noires', 'Marché artisanal (Soumbédioune ou Kermel)', 'Place de l\'Indépendance'],
    price: '65 000 FCFA',
    priceNote: 'par personne',
    popular: true,
    cta: 'Réserver',
    href: '/booking/new',
  },
  {
    id: 'lac-rose',
    title: 'Pack Évasion Lac Rose (4H)',
    description: 'Évadez-vous vers les paysages uniques du Lac Rose et ses environs',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=320&fit=crop',
    duration: 'Demi-journée (4h)',
    maxPeople: 6,
    rating: 4.9,
    highlights: ['Quad', 'Balade en pirogue', 'Promenade à dos de chameau', 'Visite du Village des Tortues'],
    price: '84 000 FCFA',
    priceNote: 'par personne',
    popular: false,
    cta: 'Réserver',
    href: '/booking/new',
  },
  {
    id: 'goree',
    title: 'Pack Horizon Île de Gorée (4H)',
    description: 'Transfert en ferry + visite guidée de l\'île historique de Gorée',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=320&fit=crop',
    duration: 'Demi-journée (4h)',
    maxPeople: 8,
    rating: 4.8,
    highlights: ['Église Saint-Charles Borromée', 'Maison des Esclaves', 'Mémorial de Gorée'],
    price: '60 000 FCFA',
    priceNote: 'par personne',
    popular: false,
    cta: 'Réserver',
    href: '/booking/new',
  },
  {
    id: 'baobab',
    title: 'Pack Aventure Parc Accro Baobab (5H)',
    description: 'Adrénaline garantie dans le parc d\'aventure au cœur des baobabs',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=320&fit=crop',
    duration: 'Demi-journée (5h)',
    maxPeople: 6,
    rating: 4.9,
    highlights: ['Parcours accrobranche (20 ateliers - 3 niveaux)', 'Escalade sur baobab'],
    price: '95 000 FCFA',
    priceNote: 'par personne',
    popular: false,
    cta: 'Réserver',
    href: '/booking/new',
  },
  {
    id: 'globetrotter',
    title: 'Pack Globetrotter Journée Complète (7H)',
    description: 'Immersion unique entre faune et nature dans les réserves du Sénégal',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=320&fit=crop',
    duration: 'Journée complète (7h)',
    maxPeople: 4,
    rating: 5,
    highlights: ['Fathala: Marche avec les lions', 'Sine Saloum: Pirogue en mangrove & observatoire d\'oiseaux'],
    price: '185 000 FCFA',
    priceNote: 'par personne',
    popular: true,
    cta: 'Réserver',
    href: '/booking/new',
  },
  {
    id: 'personnalise',
    title: 'Circuit Personnalisé',
    description: 'Créez votre circuit sur mesure selon vos envies',
    image: null,
    duration: 'Sur mesure',
    maxPeople: 12,
    rating: 5,
    highlights: ['Itinéraire personnalisé', 'Durée flexible', 'Activités à la carte', 'Accompagnement dédié'],
    price: 'Sur devis',
    priceNote: '',
    popular: false,
    cta: 'Contacter',
    href: '/aide',
    customCard: true,
  },
];

export function ToursSection() {
  return (
    <section id="tours" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Découvrez les merveilles du{' '}
            <span className="text-primary-600">Sénégal</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explorez le Sénégal avec nos circuits touristiques soigneusement conçus.
            De Dakar à la Casamance, vivez des expériences authentiques et inoubliables.
          </p>
        </div>

        {/* Tours Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TOURS.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCard({
  tour,
}: {
  tour: (typeof TOURS)[0];
}) {
  const [showHighlights, setShowHighlights] = useState(true);

  return (
    <div className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image section */}
      <div className="relative aspect-[4/3] bg-transparent flex items-center justify-center overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-50">
            <Sparkles className="w-16 h-16 text-primary-600" aria-hidden />
          </div>
        )}
        {/* Populaire tag */}
        {tour.popular && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold">
            Populaire
          </span>
        )}
      </div>

      {/* Content - White section with hover effect */}
      <div className="bg-transparent group-hover:bg-gray-50/30 p-6 transition-colors duration-300">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {tour.title}
          </h3>
        </div>

        {/* Description - becomes yellow on hover */}
        <p className="text-sm text-gray-400 leading-relaxed group-hover:bg-secondary-100 group-hover:text-primary-600 group-hover:px-3 group-hover:py-2 rounded-md transition-all duration-300 inline-block mb-4">
          {tour.description}
        </p>

        {/* Details row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-primary-600" />
            {tour.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            <Users className="w-3.5 h-3.5 text-primary-600" />
            Max {tour.maxPeople}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            <Star className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
            {tour.rating}
          </span>
        </div>

        {/* Points forts */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowHighlights(!showHighlights)}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-2 text-sm"
          >
            Points forts
            <span className="text-gray-500 text-sm font-normal">
              {showHighlights ? '−' : '+'}
            </span>
          </button>
          {showHighlights && (
            <ul className="space-y-1.5">
              {tour.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price & CTA */}
        <div className="pt-4 border-t border-gray-100">
          <p className={`text-lg font-bold text-primary-600 ${tour.priceNote ? 'mb-1' : 'mb-4'}`}>
            {tour.price}
          </p>
          {tour.priceNote && (
            <p className="text-sm text-gray-500 mb-4">{tour.priceNote}</p>
          )}
          <Link
            href={tour.href}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-all duration-300 group/btn"
          >
            <span>{tour.cta}</span>
            <span className="group-hover/btn:translate-x-1 transition-transform duration-300" aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
