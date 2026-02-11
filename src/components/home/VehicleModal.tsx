'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Users, Luggage, Star, Check, Globe, Award, ChevronDown, Info, Clock, CreditCard, MapPin, AlertCircle, Fuel, Car, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Driver {
  name: string;
  photo?: string;
  rating: number;
  tripsCount: number;
  experience: number;
  languages: string[];
  certifications: string[];
  specialties: string[];
  status: 'available' | 'on-trip';
}

interface Vehicle {
  id: number;
  label: string;
  type: string;
  image: string;
  price: number;
  passengers: number;
  luggage: number;
  description: string;
  features: string[];
  fuelType: string;
  year: number;
  driver: Driver;
}

interface VehicleModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleModal({ vehicle, isOpen, onClose }: VehicleModalProps) {
  const [showRules, setShowRules] = useState(false);
  
  if (!isOpen || !vehicle) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4 pt-24"
        onClick={onClose}
      >
        {/* Modal - Largeur réduite */}
        <div
          className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header avec X proéminent */}
          <div className="relative px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 pr-10">{vehicle.label}</h2>
              <p className="text-sm text-gray-500 mt-1">{vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</p>
            </div>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Prix et capacités - avec titres */}
            <div className="pb-4 border-b border-gray-100">
              {/* 5 éléments répartis sur toute la largeur */}
              <div className="grid grid-cols-5 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">{vehicle.price}€</span>
                  </div>
                  <p className="hidden md:block text-xs text-gray-500 uppercase tracking-wide">Prix</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">{vehicle.passengers}</span>
                  </div>
                  <p className="hidden md:block text-xs text-gray-500 uppercase tracking-wide">Passagers</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">{vehicle.luggage}</span>
                  </div>
                  <p className="hidden md:block text-xs text-gray-500 uppercase tracking-wide">Bagages</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">{vehicle.fuelType}</span>
                  </div>
                  <p className="hidden md:block text-xs text-gray-500 uppercase tracking-wide">Carburant</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium capitalize">{vehicle.type}</span>
                  </div>
                  <p className="hidden md:block text-xs text-gray-500 uppercase tracking-wide">Type</p>
                </div>
              </div>
            </div>

            {/* Chauffeur - compact */}
            <div className="pb-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Votre chauffeur</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {vehicle.driver.photo ? (
                    <Image
                      src={vehicle.driver.photo}
                      alt={vehicle.driver.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    vehicle.driver.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-semibold text-gray-900 truncate">{vehicle.driver.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{vehicle.driver.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{vehicle.driver.tripsCount}+ trajets</span>
                    <span>•</span>
                    <span>{vehicle.driver.experience} ans</span>
                    {vehicle.driver.languages.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>{vehicle.driver.languages.join(', ')}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vehicle.driver.status === 'available'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  {vehicle.driver.status === 'available' ? 'Disponible' : 'En trajet'}
                </span>
              </div>
            </div>

            {/* Équipements - grille 3x4 (12 éléments) */}
            <div className="pb-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Équipements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {vehicle.features.slice(0, 12).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description - compact */}
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Règles et conditions - Accordéon compact */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowRules(!showRules)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-semibold text-gray-900">Règles et conditions</span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showRules ? 'rotate-180' : ''}`}
                />
              </button>
              
              {showRules && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                  {/* Annulation */}
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-0.5">Annulation gratuite jusqu'à 24h</p>
                      <p className="text-xs text-gray-500">50% de frais entre 24h-12h. Non remboursable &lt;12h.</p>
                    </div>
                  </div>

                  {/* Paiement */}
                  <div className="flex items-start gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-0.5">Acompte 30%</p>
                      <p className="text-xs text-gray-500">Solde en espèces ou carte au chauffeur.</p>
                    </div>
                  </div>

                  {/* Attente */}
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-0.5">Attente incluse</p>
                      <p className="text-xs text-gray-500">15 min aéroport • 5 min autres destinations.</p>
                    </div>
                  </div>

                  {/* Suppléments - format compact */}
                  <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-1.5">Suppléments</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Aéroport</span>
                          <span className="font-medium text-gray-900">+5€</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Nuit (22h-6h)</span>
                          <span className="font-medium text-gray-900">+10€</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Zone &gt;50km</span>
                          <span className="font-medium text-gray-900">+20€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bouton d'action - sticky */}
          <div className="px-6 py-4 border-t border-gray-100 bg-white rounded-b-2xl flex-shrink-0">
            <Link
              href="/booking/new"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
