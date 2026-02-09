'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Header, PageContainer } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { formatPhoneNumber } from '@/lib/utils/formatters';
import { formatPrice } from '@/lib/utils/pricing';
import { cn } from '@/lib/utils/cn';

// Mock stats
const stats = {
  totalRides: 12,
  totalSpent: 86500, // en centimes
};

/**
 * Calcule les initiales d'un nom
 */
function getInitials(name?: string): string {
  if (!name || name.trim() === '') {
    return 'U';
  }

  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  // Prendre les premières lettres des deux premiers mots (max 2 lettres)
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // Ne pas afficher la page si non authentifié
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const displayName = user.name || 'Utilisateur';
  const initials = getInitials(user.name);
  const formattedPhone = formatPhoneNumber(user.phone);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Mon profil" />

      <PageContainer className="py-6 space-y-6">
        {/* Avatar et infos user */}
        <Card className="flex flex-col items-center py-6">
          {/* Avatar circulaire */}
          <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center mb-4">
            <span className="text-white text-3xl font-bold">{initials}</span>
          </div>

          {/* Nom */}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="opacity-50 cursor-not-allowed"
              aria-label="Modifier le nom (bientôt disponible)"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Button>
          </div>

          {/* Téléphone */}
          <p className="text-gray-600">{formattedPhone}</p>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4">
          {/* Nombre de courses */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">Courses</p>
              <p className="text-2xl font-bold text-gray-900" aria-label={`${stats.totalRides} courses`}>
                {stats.totalRides}
              </p>
            </div>
          </Card>

          {/* Montant total dépensé */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total dépensé</p>
              <p className="text-2xl font-bold text-gray-900" aria-label={`Total dépensé : ${formatPrice(stats.totalSpent)}`}>
                {formatPrice(stats.totalSpent)}
              </p>
            </div>
          </Card>
        </div>

        {/* Section paramètres */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres</h2>
          <p className="text-sm text-gray-500 text-center py-4">
            Bientôt disponible
          </p>
        </Card>

        {/* Bouton déconnexion */}
        <Button
          variant="danger"
          size="lg"
          onClick={handleLogout}
          className="w-full mt-4"
          aria-label="Se déconnecter"
        >
          Déconnexion
        </Button>
      </PageContainer>
    </div>
  );
}
