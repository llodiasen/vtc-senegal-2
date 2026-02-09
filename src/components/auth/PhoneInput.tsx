'use client';

import { forwardRef, useState, useEffect, useId } from 'react';
import { cn } from '@/lib/utils/cn';
import { formatPhoneNumber } from '@/lib/utils/formatters';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Valeur du numéro de téléphone (chiffres uniquement, sans formatage) */
  value: string;
  /** Callback appelé lors du changement de valeur (reçoit la valeur brute) */
  onChange: (value: string) => void;
  /** Label optionnel affiché au-dessus de l'input */
  label?: string;
  /** Message d'erreur affiché en-dessous de l'input */
  error?: string;
}

/**
 * Composant PhoneInput - Input de numéro de téléphone avec formatage automatique
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, label, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || `phone-input-${generatedId.replace(/:/g, '')}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const [displayValue, setDisplayValue] = useState('');

    // Synchroniser la valeur affichée avec la prop value
    useEffect(() => {
      if (value) {
        const formatted = formatPhoneNumber(value);
        setDisplayValue(formatted);
      } else {
        setDisplayValue('');
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Extraire uniquement les chiffres
      const digitsOnly = inputValue.replace(/\D/g, '');
      
      // Limiter à 12 chiffres (221 + 9 chiffres)
      const limitedDigits = digitsOnly.slice(0, 12);
      
      // Formater la valeur pour l'affichage
      const formatted = formatPhoneNumber(limitedDigits);
      setDisplayValue(formatted);
      
      // Appeler onChange avec la valeur brute (chiffres uniquement)
      onChange(limitedDigits);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Icône téléphone */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type="tel"
            value={displayValue}
            onChange={handleChange}
            className={cn(
              'w-full pl-10 pr-3 py-2 border rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              'transition-colors',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300',
              className
            )}
            placeholder="+221 77 123 45 67"
            aria-label="Numéro de téléphone"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={errorId}
            {...props}
          />
        </div>

        {/* Message d'erreur */}
        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
