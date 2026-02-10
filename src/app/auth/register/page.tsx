'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, EyeOff, X, Check, Globe, ChevronDown, HelpCircle } from 'lucide-react';

export default function RegisterPage() {
  const [userType, setUserType] = useState<'particulier' | 'entreprise'>('particulier');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    acceptEmail: false,
    acceptSMS: false,
  });

  // Password validation
  const passwordChecks = {
    minLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
  };

  const allPasswordChecksPassed = Object.values(passwordChecks).every(check => check);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Form submitted:', formData);
  };

  const isFormValid = 
    formData.lastName &&
    formData.firstName &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    allPasswordChecksPassed &&
    formData.password === formData.confirmPassword;

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">S&apos;inscrire</h1>

        {/* User Type Selection */}
        <div className="mb-6">
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUserType('particulier')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                userType === 'particulier'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Particulier
            </button>
            <button
              type="button"
              onClick={() => setUserType('entreprise')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                userType === 'entreprise'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entreprise
            </button>
          </div>
        </div>

        {/* Driver Link */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Vous êtes chauffeur ?{' '}
            <Link href="/devenir-chauffeur" className="text-primary-600 hover:text-primary-700 font-medium">
              Conduire avec scod vtc
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Dupont"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Alain"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              required
            />
          </div>

          {/* Email */}
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

          {/* Phone */}
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
                placeholder="********"
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

            {/* Password Requirements */}
            <div className="mt-2 space-y-1.5">
              {[
                { key: 'minLength', label: 'Contient au minimum 8 caractères ?' },
                { key: 'hasNumber', label: 'Contient un nombre ?' },
                { key: 'hasUpperCase', label: 'Contient une majuscule ?' },
                { key: 'hasLowerCase', label: 'Contient une minuscule ?' },
              ].map((check) => {
                const passed = passwordChecks[check.key as keyof typeof passwordChecks];
                return (
                  <div key={check.key} className="flex items-center gap-2 text-sm">
                    {passed ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={passed ? 'text-green-600' : 'text-red-500'}>
                      {check.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmez le mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">Les mots de passe ne correspondent pas</p>
            )}
          </div>

          {/* Referral Code */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
                Code parrain (optionnel) ?
              </label>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Informations sur le code parrain"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              id="referralCode"
              value={formData.referralCode}
              onChange={(e) => handleInputChange('referralCode', e.target.value)}
              placeholder=""
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Marketing Opt-ins */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptEmail}
                onChange={(e) => handleInputChange('acceptEmail', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                J&apos;accepte de recevoir les codes promo et actualités de scod vtc par courriel.
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptSMS}
                onChange={(e) => handleInputChange('acceptSMS', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                J&apos;accepte de recevoir les codes promo et actualités de scod vtc par SMS.
              </span>
            </label>
          </div>

          {/* Terms and Conditions */}
          <div className="pt-2">
            <p className="text-xs text-gray-600 leading-relaxed">
              En cliquant sur «Créer mon compte», vous acceptez les{' '}
              <Link href="/cgu" className="text-primary-600 hover:text-primary-700 underline">
                Conditions générales de service
              </Link>
              . Tous les champs sont obligatoires,{' '}
              <Link href="/aide" className="text-primary-600 hover:text-primary-700 underline">
                en savoir plus
              </Link>
              .
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors ${
              isFormValid
                ? 'bg-gray-800 text-white hover:bg-gray-900'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Créer mon compte
          </button>

          {/* Login Link */}
          <div className="text-center pt-2">
            <Link
              href="/auth/login"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Se connecter
            </Link>
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
