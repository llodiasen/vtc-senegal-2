import { useRef, useEffect, useState, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface OTPInputProps {
  /** Tableau de valeurs pour chaque input */
  value: string[];
  /** Callback appelé lors du changement de valeur */
  onChange: (otp: string[]) => void;
  /** Nombre d'inputs (par défaut 6) */
  length?: number;
  /** Soumet automatiquement quand le code est complet */
  autoSubmit?: boolean;
  /** Callback appelé lors de l'auto-submit */
  onSubmit?: (otp: string) => void;
  /** Message d'erreur global */
  error?: string;
  /** Désactive tous les inputs */
  disabled?: boolean;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant OTPInput - Input pour code OTP avec gestion intelligente du focus
 */
export function OTPInput({
  value,
  onChange,
  length = 6,
  autoSubmit = false,
  onSubmit,
  error,
  disabled = false,
  className,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [localValue, setLocalValue] = useState<string[]>(value);

  // Synchroniser la valeur locale avec la prop value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Auto-submit quand le code est complet
  useEffect(() => {
    if (autoSubmit && onSubmit && localValue.length === length && localValue.every((v) => v.length === 1)) {
      const otpString = localValue.join('');
      if (otpString.length === length) {
        onSubmit(otpString);
      }
    }
  }, [localValue, length, autoSubmit, onSubmit]);

  const updateValue = (index: number, newValue: string) => {
    const updated = [...localValue];
    updated[index] = newValue;
    setLocalValue(updated);
    onChange(updated);
  };

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const focusNext = (currentIndex: number) => {
    // Trouver le prochain champ vide
    for (let i = currentIndex + 1; i < length; i++) {
      if (!localValue[i] || localValue[i].length === 0) {
        focusInput(i);
        return;
      }
    }
    // Si tous les champs suivants sont remplis, focus sur le dernier
    if (currentIndex < length - 1) {
      focusInput(length - 1);
    }
  };

  const focusPrev = (currentIndex: number) => {
    if (currentIndex > 0) {
      focusInput(currentIndex - 1);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Ne garder que les chiffres
    const digitsOnly = inputValue.replace(/\D/g, '');

    if (digitsOnly.length > 0) {
      // Prendre seulement le premier chiffre
      const digit = digitsOnly[0];
      updateValue(index, digit);
      
      // Focus sur le champ suivant
      focusNext(index);
    } else {
      updateValue(index, '');
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (localValue[index] && localValue[index].length > 0) {
        // Si le champ est rempli, l'effacer
        updateValue(index, '');
      } else {
        // Si le champ est vide, focus sur le précédent
        focusPrev(index);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPrev(index);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusNext(index);
    } else if (e.key === 'Delete') {
      updateValue(index, '');
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digitsOnly = pastedData.replace(/\D/g, '');

    if (digitsOnly.length > 0) {
      const newValue = [...localValue];
      const startIndex = 0;

      // Remplir les champs avec les chiffres collés
      for (let i = 0; i < Math.min(digitsOnly.length, length); i++) {
        if (startIndex + i < length) {
          newValue[startIndex + i] = digitsOnly[i];
        }
      }

      setLocalValue(newValue);
      onChange(newValue);

      // Focus sur le dernier champ rempli ou le suivant
      const lastFilledIndex = Math.min(digitsOnly.length - 1, length - 1);
      const nextIndex = Math.min(lastFilledIndex + 1, length - 1);
      setTimeout(() => focusInput(nextIndex), 0);
    }
  };

  const handleFocus = (index: number) => {
    // Sélectionner le contenu quand on focus
    inputRefs.current[index]?.select();
  };

  const generatedId = useId();
  const containerId = `otp-input-${generatedId.replace(/:/g, '')}`;
  const errorId = error ? `${containerId}-error` : undefined;

  return (
    <div className={cn('w-full', className)}>
      <div
        className="flex gap-2 justify-center"
        role="group"
        aria-label="Code de vérification"
        aria-describedby={errorId}
      >
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={localValue[index] || ''}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            disabled={disabled}
            maxLength={1}
            className={cn(
              'w-12 h-12 text-center text-lg font-semibold',
              'border rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              'transition-colors',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300',
              'aria-invalid:border-red-500'
            )}
            aria-label={`Chiffre ${index + 1} du code de vérification`}
            aria-invalid={error ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Message d'erreur */}
      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-600 text-center"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
