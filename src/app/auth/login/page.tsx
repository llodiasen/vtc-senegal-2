'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PhoneInput } from '@/components/auth';
import { Button, Card } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/booking/new';
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePhone = (phoneValue: string): boolean => {
    // Vérifier que le numéro a au moins 9 chiffres (après le code pays 221)
    // Le numéro total doit faire au moins 12 chiffres (221 + 9 chiffres)
    const digitsOnly = phoneValue.replace(/\D/g, '');
    return digitsOnly.length >= 12;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    // Réinitialiser l'erreur quand l'utilisateur tape
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!validatePhone(phone)) {
      setError('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirection vers verify avec le paramètre redirect
      router.push(`/auth/verify?phone=${encodeURIComponent(phone)}&redirect=${encodeURIComponent(redirectTo)}`);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  const isPhoneValid = validatePhone(phone);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center px-4 py-8">
      {/* Logo/icône centré en haut */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Card blanche arrondie */}
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              scod vtc
            </h1>
            <p className="text-gray-600">
              Votre chauffeur privé en quelques clics
            </p>
          </div>

          {/* Input téléphone */}
          <div>
            <PhoneInput
              value={phone}
              onChange={handlePhoneChange}
              error={error || undefined}
              disabled={isLoading}
              placeholder="+221 77 123 45 67"
              label="Numéro de téléphone"
            />
          </div>

          {/* Bouton Continuer */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            disabled={!isPhoneValid || isLoading}
            className="w-full"
          >
            Continuer
          </Button>

          {/* Note SMS */}
          <p className="text-sm text-gray-500 text-center">
            Vous recevrez un code par SMS
          </p>
        </form>

        {/* Footer CGU */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            En continuant, vous acceptez nos{' '}
            <a
              href="/cgu"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Conditions Générales d'Utilisation
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
