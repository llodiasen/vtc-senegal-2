import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const PHONES = ['+221 77 822 34 93', '+221 76 989 70 17'];
const EMAIL = 'contact@scodvtc.com';
const ADDRESS = 'Fann residence / Dakar';

const SERVICES_LINKS = [
  { label: 'Transport familial', href: '/booking/new' },
  { label: 'Transfert aéroport', href: '/booking/new' },
  { label: 'Transport professionnel', href: '/booking/new' },
  { label: 'Occasions spéciales', href: '/booking/new' },
  { label: 'Services entreprises', href: '/entreprise/corporate' },
];

const QUICK_LINKS = [
  { label: 'À propos', href: '/pourquoi-scod-vtc' },
  { label: 'Nos services', href: '#services' },
  { label: 'Tourisme', href: '#tours' },
  { label: 'Services Entreprises', href: '/entreprise/corporate' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="bg-primary-800 text-white" role="contentinfo">
      {/* Top section - 4 columns */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1 - Company */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">scod vtc</span>
            </Link>
            <p className="text-white/90 text-sm leading-relaxed">
              Votre partenaire de confiance pour tous vos déplacements au
              Sénégal. Service VTC professionnel, sécurisé et disponible 24h/24.
            </p>
          </div>

          {/* Column 2 - Nos Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {SERVICES_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/90 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Liens Rapides */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/90 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {PHONES.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-white/90 text-sm hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-white/70 flex-shrink-0" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-white/90 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/90 text-sm">
                  <MapPin className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                  {ADDRESS}
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 text-white/90 text-sm">
                  <Clock className="w-4 h-4 text-white/70 flex-shrink-0" />
                  24h/24 - 7j/7
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-white/10" />

      {/* Bottom section */}
      <div className="bg-primary-700 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/90 text-sm">
              © {new Date().getFullYear()} scod vtc. Tous droits réservés.
            </p>
            <p className="text-white/70 text-xs mt-1">
              Developed by Connect Web
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/cgu"
              className="text-white/90 text-sm hover:text-white transition-colors"
            >
              Conditions d&apos;utilisation
            </Link>
            <Link
              href="/confidentialite"
              className="text-white/90 text-sm hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
