'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, EyeOff, Globe, ChevronDown, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/booking/new';
  
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePhone = (phoneValue: string): boolean => {
    const digitsOnly = phoneValue.replace(/\D/g, '');
    return digitsOnly.length >= 12;
  };

  const validateEmail = (emailValue: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (loginMethod === 'phone') {
      if (!validatePhone(formData.phone)) {
        setError('Veuillez entrer un numéro de téléphone valide');
        return;
      }
    } else {
      if (!validateEmail(formData.email)) {
        setError('Veuillez entrer une adresse email valide');
        return;
      }
    }

    if (!formData.password) {
      setError('Veuillez entrer votre mot de passe');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Si connexion par téléphone, rediriger vers verify
      if (loginMethod === 'phone') {
        router.push(`/auth/verify?phone=${encodeURIComponent(formData.phone)}&redirect=${encodeURIComponent(redirectTo)}`);
      } else {
        // TODO: Implémenter la connexion par email
        router.push(redirectTo);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  const isFormValid = 
    (loginMethod === 'phone' ? validatePhone(formData.phone) : validateEmail(formData.email)) &&
    formData.password.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="scod vtc"
                width={180}
                height={60}
                className="h-12 w-auto"
                unoptimized
              />
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                aria-label="Changer de langue"
                aria-expanded={isLangDropdownOpen}
              >
                <Globe className="w-4 h-4" />
                <span>FR</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-50"
                    disabled
                  >
                    <span className="w-6 h-6 rounded-full bg-primary-600" />
                    <span className="flex-1 text-left">Français</span>
                    <Check className="w-4 h-4 text-primary-600" />
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsLangDropdownOpen(false)}
                  >
                    <span className="w-6 h-6 rounded-full bg-red-600" />
                    <span className="flex-1 text-left">Anglais</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Se connecter</h1>

        {/* Login Method Selection */}
        <div className="mb-6">
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'phone'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Téléphone
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'email'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Email
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Phone or Email Input */}
          {loginMethod === 'phone' ? (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-l-lg bg-gray-50">
                  <span className="text-lg">🇸🇳</span>
                  <span className="text-sm font-medium text-gray-700">+221</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="77 123 45 67"
                  className="flex-1 px-4 py-2.5 border border-gray-300 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="alain.dupont@gmail.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Terms and Conditions */}
          <div className="pt-2">
            <p className="text-xs text-gray-600 leading-relaxed">
              En cliquant sur «Se connecter», vous acceptez les{' '}
              <Link href="/cgu" className="text-primary-600 hover:text-primary-700 underline">
                Conditions générales de service
              </Link>
              .
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors ${
              isFormValid && !isLoading
                ? 'bg-gray-800 text-white hover:bg-gray-900'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>

          {/* Register Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Vous n&apos;avez pas de compte ?{' '}
              <Link
                href="/auth/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </form>

        {/* Footer Legal */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            Les données personnelles collectées sont traitées par scod vtc en qualité de responsable de traitement, conformément à la Loi Informatique et Libertés du 6 janvier 1978 modifiée. Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données vous concernant. Ces données sont utilisées pour la gestion de nos services et offres. Pour plus d&apos;informations,{' '}
            <Link href="/confidentialite" className="text-primary-600 hover:text-primary-700 underline">
              cliquez ici
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
