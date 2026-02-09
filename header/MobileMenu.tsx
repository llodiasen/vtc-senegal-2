'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Globe } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isAuthenticated: boolean;
  user: any;
}

const MobileMenu = ({ isOpen, onClose, navItems, isAuthenticated, user }: MobileMenuProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 xl:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Sidebar */}
      <div
        className="fixed top-16 lg:top-20 right-0 bottom-0 left-0 bg-gray-900 z-40 overflow-y-auto xl:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col h-full" aria-label="Navigation mobile">
          <div className="flex-1 px-6 py-8 space-y-8">
            {/* Main Navigation */}
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full text-sm font-medium text-gray-400 uppercase"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Items */}
                      {openDropdown === item.label && (
                        <div className="mt-4 ml-0 space-y-4">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={onClose}
                              className="block text-xl font-medium text-white hover:text-emerald-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="block text-sm font-medium text-gray-400 uppercase mb-4">
                        Autres
                      </span>
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className="block text-xl font-medium text-white hover:text-emerald-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
                      >
                        {item.label}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Secondary Links (Mobile Only - Small Screens) */}
            <div className="sm:hidden space-y-4 pt-6 border-t border-gray-800">
              {/* Aide */}
              <Link
                href="/aide"
                onClick={onClose}
                className="flex items-center gap-3 text-white py-3 border-b border-gray-800 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gradient-to-r after:from-gray-800 after:to-white after:transition-all after:duration-200 after:scale-x-0 hover:after:scale-x-100"
              >
                <svg className="w-5 h-5 mt-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                </svg>
                <span>Aide</span>
              </Link>

              {/* Language Selector */}
              <div>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-3 text-white py-3 border-b border-gray-800 w-full relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gradient-to-r after:from-gray-800 after:to-white after:transition-all after:duration-200 after:scale-x-0 hover:after:scale-x-100"
                >
                  <Globe className="w-5 h-5 mt-1" />
                  <span>FR</span>
                </button>

                {isLangDropdownOpen && (
                  <div className="mt-2 ml-8 space-y-2">
                    <button
                      className="flex items-center gap-2 text-white font-medium"
                      disabled
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600" />
                      <span>Français</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      onClick={() => {
                        // TODO: Implémenter le changement de langue
                        setIsLangDropdownOpen(false);
                      }}
                    >
                      <span className="w-6 h-6 rounded-full bg-red-600" />
                      <span>Anglais</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Auth Buttons (Mobile Only - Small Screens) */}
            <div className="sm:hidden pt-6">
              {isAuthenticated && user ? (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="block w-full px-4 py-3 text-sm font-medium text-center text-gray-900 bg-white rounded-md hover:bg-gray-100 transition-colors"
                >
                  Mon compte
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="px-4 py-3 text-sm font-medium text-center text-white border border-white rounded-md hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={onClose}
                    className="px-4 py-3 text-sm font-medium text-center text-gray-900 bg-white rounded-md hover:bg-gray-100 transition-colors"
                  >
                    S&apos;inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
