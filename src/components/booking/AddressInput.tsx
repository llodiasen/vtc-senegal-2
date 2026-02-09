import { useState, useEffect, useRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';
import type { Location } from '@/lib/types/booking';
import { useGeolocation, useDebounce } from '@/lib/hooks';
import { Spinner } from '@/components/ui';

interface Place {
  description: string;
  location: Location;
}

interface AddressInputProps {
  /** Label de l'input */
  label: string;
  /** Placeholder de l'input */
  placeholder: string;
  /** Valeur actuelle de l'adresse */
  value: string;
  /** Callback appelé lors de la sélection d'une suggestion */
  onChange: (address: string, location: Location) => void;
  /** Icône optionnelle à gauche de l'input */
  icon?: React.ReactNode;
  /** Message d'erreur */
  error?: string;
  /** Désactive l'input */
  disabled?: boolean;
  /** Classes CSS supplémentaires */
  className?: string;
}

// Mock data pour les suggestions Dakar
const mockPlaces: Place[] = [
  {
    description: 'Plateau, Dakar',
    location: { lat: 14.6937, lng: -17.4441, address: 'Plateau, Dakar' },
  },
  {
    description: 'Almadies, Dakar',
    location: { lat: 14.7392, lng: -17.5075, address: 'Almadies, Dakar' },
  },
  {
    description: 'Parcelles Assainies, Dakar',
    location: {
      lat: 14.7719,
      lng: -17.4297,
      address: 'Parcelles Assainies, Dakar',
    },
  },
  {
    description: 'Ouakam, Dakar',
    location: { lat: 14.7167, lng: -17.4897, address: 'Ouakam, Dakar' },
  },
  {
    description: 'Yoff, Dakar',
    location: { lat: 14.7500, lng: -17.4667, address: 'Yoff, Dakar' },
  },
];

/**
 * Composant AddressInput - Input d'adresse avec autocomplete et suggestions
 */
export function AddressInput({
  label,
  placeholder,
  value,
  onChange,
  icon,
  error,
  disabled = false,
  className,
}: AddressInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Place[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hasMounted, setHasMounted] = useState(false);
  const [geoAvailable, setGeoAvailable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Détection géoloc uniquement au client après montage (évite hydration mismatch)
  useEffect(() => {
    setHasMounted(true);
    setGeoAvailable(
      typeof navigator !== 'undefined' && !!navigator.geolocation
    );
  }, []);

  // Hook de géolocalisation
  const {
    location: geoLocation,
    error: geoError,
    isLoading: isGeoLoading,
    getCurrentLocation,
  } = useGeolocation();

  // Debounce de la valeur pour éviter trop de recherches
  const debouncedValue = useDebounce(value, 300);

  // Filtrer les suggestions basé sur la valeur debounced de l'input
  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 0) {
      const filtered = mockPlaces.filter((place) =>
        place.description.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [debouncedValue]);

  // Fermer le dropdown lors d'un clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (place: Place) => {
    onChange(place.description, place.location);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleSelect(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Appeler onChange avec la nouvelle valeur et une location temporaire
    // La location sera mise à jour lors de la sélection d'une suggestion
    const tempLocation: Location = {
      lat: 0,
      lng: 0,
      address: newValue,
    };
    onChange(newValue, tempLocation);
    
    // Filtrer et ouvrir le dropdown si nécessaire
    if (newValue.length > 0) {
      const filtered = mockPlaces.filter((place) =>
        place.description.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setIsOpen(false);
    }
  };

  // Utiliser la géolocalisation pour remplir l'input
  useEffect(() => {
    if (geoLocation) {
      // Créer une location avec l'adresse "Ma position" (sera remplacée par reverse geocoding plus tard)
      const location: Location = {
        lat: geoLocation.lat,
        lng: geoLocation.lng,
        address: 'Ma position',
      };
      onChange('Ma position', location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoLocation]); // onChange est stable, pas besoin de le mettre dans les dépendances

  const handleGetCurrentLocation = () => {
    getCurrentLocation();
  };

  const generatedId = useId();
  const inputId = `address-input-${generatedId.replace(/:/g, '')}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div ref={containerRef} className={cn('w-full relative', className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {/* Icône optionnelle */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (filteredSuggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full border rounded-lg',
            icon ? 'pl-10' : 'pl-3',
            'pr-12 py-2', // Ajout de pr-12 pour laisser de la place au bouton
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'transition-colors',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300',
            className
          )}
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          role="combobox"
        />

        {/* Bouton Ma position - toujours dans le DOM pour éviter hydration mismatch, visible seulement après montage si géoloc dispo */}
        {(() => {
          const canShowGeo = hasMounted && geoAvailable;
          return (
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={disabled || isGeoLoading || !canShowGeo}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'p-2 rounded-lg',
                'text-gray-600 hover:text-primary-600',
                'hover:bg-gray-100',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors',
                !canShowGeo && 'invisible pointer-events-none'
              )}
              aria-label="Utiliser ma position actuelle"
              title="Utiliser ma position actuelle"
              tabIndex={canShowGeo ? 0 : -1}
            >
              {isGeoLoading ? (
                <Spinner size="sm" />
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          );
        })()}

                {/* Dropdown suggestions */}
                {isOpen && filteredSuggestions.length > 0 && (
                  <div
                    className={cn(
                      'absolute z-50 w-full mt-1',
                      'bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl',
                      'max-h-60 overflow-y-auto'
                    )}
                    role="listbox"
                  >
                    {filteredSuggestions.map((place, index) => (
                      <button
                        key={place.description}
                        type="button"
                        onClick={() => handleSelect(place)}
                        className={cn(
                          'w-full text-left px-4 py-3',
                          'hover:bg-white/50 transition-colors',
                          'focus:outline-none focus:bg-white/50',
                          selectedIndex === index && 'bg-white/50'
                        )}
                        role="option"
                        aria-selected={selectedIndex === index}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-900">{place.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
      </div>

      {/* Message d'erreur */}
      {(error || geoError) && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error || geoError}
        </p>
      )}
    </div>
  );
}
