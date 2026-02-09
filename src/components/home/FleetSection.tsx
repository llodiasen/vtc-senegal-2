'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Minus, Star, Check, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'berlines', label: 'Berlines', count: 4 },
  { id: 'suv', label: 'SUV', count: 6 },
  { id: '4x4', label: '4x4', count: 2 },
  { id: 'vans', label: 'Vans', count: 4 },
  { id: 'bus', label: 'Bus', count: 2 },
] as const;

const VEHICLES = [
  {
    id: 1,
    name: 'BMW Série 5',
    category: 'berline',
    categoryLabel: 'berline',
    rating: 4.8,
    description: 'Véhicule premium avec équipements haut de gamme',
    features: ['Climatisation', 'GPS', 'Bluetooth'],
    featuresMore: 8,
    priceHour: 25000,
    priceDay: 150000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
  },
  {
    id: 2,
    name: 'Nissan Altima',
    category: 'berline',
    categoryLabel: 'berline',
    rating: 4.9,
    description: 'Véhicule premium avec équipements haut de gamme',
    features: ['Caméra de recul', 'Sièges en cuir', 'Bluetooth'],
    featuresMore: 6,
    priceHour: 10000,
    priceDay: 45000,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop',
  },
  {
    id: 3,
    name: 'Hyundai KONA',
    category: 'suv',
    categoryLabel: 'SUV',
    rating: 4.8,
    description: 'Véhicule confortable et bien équipé',
    features: ['Climatisation', 'GPS', 'Toit ouvrant'],
    featuresMore: 5,
    priceHour: 10000,
    priceDay: 30000,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=250&fit=crop',
  },
];

export function FleetSection() {
  const [activeCategory, setActiveCategory] = useState<string>('berlines');

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <Link
            href="#flotte"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium border border-primary-100 hover:bg-primary-100 transition-colors mb-6"
          >
            Notre Flotte
            <ChevronRight className="w-4 h-4" />
          </Link>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Des Véhicules{' '}
            <span className="text-primary-600">Premium</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de véhicules haut de gamme, entretenus avec soin et conduits par des chauffeurs professionnels.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                <Minus className="w-3.5 h-3.5 flex-shrink-0" />
                {cat.label} {cat.count}
              </button>
            );
          })}
        </div>

        {/* Vehicle cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VEHICLES.map((vehicle) => (
            <article
              key={vehicle.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary-600 text-white text-xs font-medium capitalize">
                  {vehicle.categoryLabel}
                </span>
                <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-white/95 text-gray-800 text-sm font-medium shadow-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {vehicle.rating}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {vehicle.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {vehicle.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {vehicle.featuresMore > 0 && (
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      +{vehicle.featuresMore}
                    </li>
                  )}
                </ul>

                {/* Pricing */}
                <div className="text-sm text-gray-700 space-y-0.5 mb-4">
                  <p>
                    <span className="font-semibold">{vehicle.priceHour.toLocaleString('fr-FR')} FCFA</span> /heure
                  </p>
                  <p>
                    <span className="font-semibold">{vehicle.priceDay.toLocaleString('fr-FR')} FCFA</span> /jour
                  </p>
                </div>

                {/* CTA */}
                <div className="flex justify-end">
                  <Link
                    href="/booking/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Réserver
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
