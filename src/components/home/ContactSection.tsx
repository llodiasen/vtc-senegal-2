'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Shield,
} from 'lucide-react';

const PHONES = ['+221 77 822 34 93', '+221 76 989 70 17'];
const EMAIL = 'contact@scodvtc.com';
const ADDRESS = 'Fann residence / Dakar';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${EMAIL}?subject=Message depuis le site&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)}`;
  };

  return (
    <section id="contact" className="bg-primary-600 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full border-2 border-white/50 text-white text-sm font-medium mb-6">
            Contactez-nous
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Parlons de votre prochain voyage
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-2">
            Notre équipe est disponible 24h/24 pour vous accompagner dans tous
            vos déplacements.
          </p>
          <p className="text-white/90 font-bold text-sm sm:text-base">
            Réponse garantie sous 15 minutes.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {/* Left - Contact cards */}
          <div className="space-y-4">
            {/* Phone */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 font-medium mb-2">Téléphone</p>
                <div className="space-y-1">
                  {PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-white text-sm hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
                <a
                  href={`tel:${PHONES[0].replace(/\s/g, '')}`}
                  className="inline-block mt-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-400 transition-colors"
                >
                  Appeler
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 font-medium">Email</p>
                <p className="text-white text-sm truncate">{EMAIL}</p>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-semibold hover:bg-white/30 transition-colors whitespace-nowrap border border-white/30"
              >
                Écrire
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur">
              <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 font-medium">Localisation</p>
                <p className="text-white text-sm">{ADDRESS}</p>
              </div>
            </div>

            {/* Navette Aéroport */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 border border-white/10">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" aria-hidden />
                </div>
              </div>
              <h3 className="text-white font-bold text-center text-lg mb-1">
                Navette Aéroport
              </h3>
              <p className="text-white text-2xl font-bold text-center mb-1">
                25,000 FCFA
              </p>
              <p className="text-white/90 text-sm text-center mb-4">
                Dakar ↔ AIBD • Service 24h/24
              </p>
              <Link
                href="/booking/new"
                className="block w-full text-center px-4 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 transition-colors border border-white/20"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>

          {/* Right - Contact form */}
          <div className="p-6 sm:p-8 rounded-xl bg-white/10 backdrop-blur border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center mb-4">
              <Send className="w-6 h-6 text-white" aria-hidden />
            </div>
            <h3 className="text-white font-bold text-xl mb-1">
              Envoyez-nous un message
            </h3>
            <p className="text-white/80 text-sm mb-6">
              Nous vous répondrons dans les plus brefs délais
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-white/90 text-sm font-medium mb-1">
                  Nom complet
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre nom complet"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-white/90 text-sm font-medium mb-1">
                  Adresse email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-white/90 text-sm font-medium mb-1">
                  Votre message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande ou question..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-y"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors border border-white/20"
              >
                <Send className="w-5 h-5" aria-hidden />
                Envoyer le message
              </button>
            </form>

            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
              <span className="flex items-center gap-2 text-white/80 text-xs">
                <Check className="w-4 h-4 text-primary-300" />
                Réponse rapide
              </span>
              <span className="flex items-center gap-2 text-white/80 text-xs">
                <Shield className="w-4 h-4 text-primary-300" />
                100% sécurisé
              </span>
            </div>
          </div>
        </div>

        {/* Social footer */}
        <div className="rounded-xl bg-primary-800/50 border border-white/10 p-6 sm:p-8">
          <h3 className="text-white font-bold text-lg mb-1">Suivez-nous</h3>
          <p className="text-white/70 text-sm mb-6">
            Restez connectés pour nos dernières actualités et offres spéciales
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              Linkedin
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              aria-label="TikTok"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
