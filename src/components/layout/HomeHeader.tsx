'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import MobileMenu from './MobileMenu';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const HomeHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    {
      label: 'Commander',
      dropdown: [
        { label: 'Commander Taxi', href: '/commander/taxi' },
        { label: 'Commander VTC', href: '/commander/vtc' },
        { label: 'Commander Taxi-moto', href: '/commander/moto' },
      ],
    },
    {
      label: 'Entreprise',
      dropdown: [
        { label: 'Hôtellerie', href: '/entreprise/hotellerie' },
        { label: 'Booking partner', href: '/entreprise/booking-partners' },
        { label: 'Assisteurs', href: '/entreprise/assisteurs' },
        { label: 'Corporate', href: '/entreprise/corporate' },
      ],
    },
    {
      label: 'Pourquoi scod vtc',
      href: '/pourquoi-scod-vtc',
    },
    {
      label: 'Devenir chauffeur',
      href: '/devenir-chauffeur',
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 shadow-sm pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop & Tablet Header */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center h-20 hover:opacity-80 transition-opacity rounded px-1"
                aria-label="Aller à la page d'accueil - SCOD VTC"
              >
                {!logoError ? (
                  <Image
                    src="/logo.png"
                    alt="SCOD VTC"
                    width={260}
                    height={80}
                    className="h-20 w-auto object-contain"
                    style={{ maxHeight: 80 }}
                    unoptimized
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <img
                    src="/logo.svg"
                    alt="SCOD VTC"
                    className="h-20 w-auto object-contain"
                    style={{ maxHeight: 80 }}
                    width={260}
                    height={80}
                  />
                )}
              </Link>

              {/* Desktop Navigation */}
              <nav
                className="hidden xl:flex items-center gap-1"
                aria-label="Navigation principale"
              >
                {navItems.map((item) => (
                  <div key={item.label} className="relative dropdown-container">
                    {item.dropdown ? (
                      <div className="group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(item.label);
                          }}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          aria-expanded={openDropdown === item.label}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === item.label ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === item.label && (
                          <div className="absolute top-full left-0 pt-2 z-50">
                            <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[220px]">
                              <div className="px-3 py-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                  {item.label}
                                </span>
                              </div>
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Side - Desktop */}
              <div className="hidden sm:flex items-center gap-2">
                {/* Language Selector */}
                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLangDropdownOpen(!isLangDropdownOpen);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    aria-label="Changer de langue"
                    aria-expanded={isLangDropdownOpen}
                    aria-haspopup="true"
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    <span>FR</span>
                  </button>

                  {/* Language Dropdown */}
                  {isLangDropdownOpen && (
                    <div className="absolute top-full right-0 pt-2 z-50">
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px]">
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-50"
                          disabled
                          aria-label="Langue actuelle : Français"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary-600" aria-hidden="true" />
                          <span className="flex-1 text-left">Français</span>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                          </svg>
                        </button>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            // TODO: Implémenter le changement de langue
                            setIsLangDropdownOpen(false);
                          }}
                          aria-label="Changer vers Anglais"
                        >
                          <span className="w-6 h-6 rounded-full bg-red-600" aria-hidden="true" />
                          <span className="flex-1 text-left">Anglais</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Aide */}
                <Link
                  href="/aide"
                  className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Aide
                </Link>

                {/* Auth Links */}
                {isAuthenticated && user ? (
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Mon compte
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/auth/register"
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      S&apos;inscrire
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden flex items-center justify-center w-11 h-11 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        user={user}
      />

      {/* Spacer pour compenser le header fixe */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
};

export default HomeHeader;
