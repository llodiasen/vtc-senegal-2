'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { formatPhoneNumber } from '@/lib/utils/formatters';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const VALID_CODE = '123456';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const phone = searchParams.get('phone') || '';
  const redirectTo = searchParams.get('redirect') || '/booking/new';
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Rediriger vers login si pas de téléphone
  useEffect(() => {
    if (!phone) {
      router.push('/auth/login');
    }
  }, [phone, router]);

  // Focus sur le premier input au montage
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusInput = (index: number) => {
    if (index >= 0 && index < 6) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    // Ne garder que les chiffres
    const digitsOnly = value.replace(/\D/g, '');

    if (digitsOnly.length > 0) {
      // Prendre seulement le premier chiffre
      const digit = digitsOnly[0];
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);
      setError(null);

      // Auto-submit si index === 5 et tous remplis
      if (index === 5) {
        const fullCode = newOtp.join('');
        if (fullCode.length === 6) {
          // Petit délai pour laisser l'utilisateur voir le dernier chiffre
          setTimeout(() => {
            handleSubmit(fullCode);
          }, 100);
          return;
        }
      }

      // Focus sur le suivant
      if (index < 5) {
        focusInput(index + 1);
      }
    } else {
      // Effacer le champ
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otp[index] && otp[index].length > 0) {
        // Si le champ est rempli, l'effacer
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else {
        // Si le champ est vide, retourner en arrière
        if (index > 0) {
          focusInput(index - 1);
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < 5) {
        focusInput(index + 1);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digitsOnly = pastedData.replace(/\D/g, '');

    if (digitsOnly.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < Math.min(digitsOnly.length, 6); i++) {
        newOtp[i] = digitsOnly[i];
      }
      setOtp(newOtp);
      setError(null);

      // Focus sur le dernier champ rempli ou le suivant
      const lastIndex = Math.min(digitsOnly.length - 1, 5);
      const nextIndex = Math.min(lastIndex + 1, 5);
      setTimeout(() => focusInput(nextIndex), 0);

      // Auto-submit si complet
      if (digitsOnly.length >= 6) {
        const fullCode = digitsOnly.substring(0, 6);
        setTimeout(() => {
          handleSubmit(fullCode);
        }, 100);
      }
    }
  };

  const resetOtp = () => {
    setOtp(Array(6).fill(''));
    setError(null);
    focusInput(0);
  };

  const handleSubmit = async (code?: string) => {
    const codeToVerify = code || otp.join('');

    if (codeToVerify.length !== 6) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (codeToVerify === VALID_CODE) {
        // Code valide : authentifier et rediriger
        const mockUser = {
          id: '1',
          phone: phone,
          name: 'Utilisateur',
          createdAt: new Date(),
        };
        setAuth(mockUser, 'mock-jwt-token');
        // Utiliser replace pour éviter de revenir en arrière avec le bouton retour
        // Petite pause pour s'assurer que le store est bien mis à jour et que les cookies sont synchronisés
        setTimeout(() => {
          router.replace(redirectTo);
        }, 300);
      } else {
        // Code invalide
        setError('Code incorrect. Veuillez réessayer.');
        resetOtp();
        setIsLoading(false);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      resetOtp();
      setResendMessage('Code renvoyé avec succès !');
      setTimeout(() => {
        setResendMessage(null);
      }, 3000);
    } catch (err) {
      setError('Erreur lors du renvoi du code. Veuillez réessayer.');
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  if (!phone) {
    return null; // Redirection en cours
  }

  const formattedPhone = formatPhoneNumber(phone);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center px-4 py-8">
      {/* Card blanche arrondie */}
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          {/* Titre */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Vérification
            </h1>
            <p className="text-gray-600">
              Code envoyé au {formattedPhone || phone}
            </p>
          </div>

          {/* 6 inputs OTP */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={otp[index] || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                className={cn(
                  'w-12 h-14 sm:w-14 sm:h-14',
                  'text-2xl font-semibold text-center',
                  'border-2 rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                  'disabled:bg-gray-100 disabled:cursor-not-allowed',
                  'transition-colors',
                  error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300',
                  otp[index] && 'border-primary-500'
                )}
                aria-label={`Chiffre ${index + 1} du code de vérification`}
                aria-invalid={error ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Message d'erreur */}
          {error && (
            <p className="text-sm text-red-600 text-center" role="alert">
              {error}
            </p>
          )}

          {/* Message de renvoi */}
          {resendMessage && (
            <p className="text-sm text-green-600 text-center" role="status">
              {resendMessage}
            </p>
          )}

          {/* Bouton Vérifier */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={() => handleSubmit()}
            disabled={!isOtpComplete || isLoading}
            isLoading={isLoading}
            className="w-full"
          >
            Vérifier
          </Button>

          {/* Bouton Renvoyer le code */}
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleResend}
            disabled={isResending || isLoading}
            isLoading={isResending}
            className="w-full"
          >
            Renvoyer le code
          </Button>

          {/* Note code de test */}
          <p className="text-xs text-gray-400 text-center">
            Code de test : 123456
          </p>
        </div>
      </Card>
    </div>
  );
}
