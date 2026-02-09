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
    <section id="tours" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-gray-700 text-sm font-medium border border-primary-100">
            <span className="w-4 h-4 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </span>
            Tourisme & Circuits
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Découvrez les merveilles du <span className="text-primary-600">Sénégal</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
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
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
      {/* Populaire tag */}
      {tour.popular && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold">
          Populaire
        </span>
      )}

      {/* Image or icon for custom card */}
      <div className="relative w-full h-48 sm:h-52 bg-gray-200">
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
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{tour.description}</p>

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
        <div className="mb-6 flex-1">
          <button
            type="button"
            onClick={() => setShowHighlights(!showHighlights)}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-2"
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
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className={`text-2xl font-bold text-primary-600 ${tour.priceNote ? 'mb-1' : 'mb-4'}`}>
            {tour.price}
          </p>
          {tour.priceNote && (
            <p className="text-sm text-gray-500 mb-4">{tour.priceNote}</p>
          )}
          <Link
            href={tour.href}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            {tour.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
