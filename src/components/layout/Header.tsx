import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  /** Titre affiché dans le header */
  title: string;
  /** Affiche le bouton retour */
  showBack?: boolean;
  /** Callback appelé lors du clic sur le bouton retour */
  onBack?: () => void;
}

/**
 * Composant Header - En-tête fixe en haut de l'écran
 */
export function Header({ title, showBack = false, onBack }: HeaderProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-primary-600 text-white',
        'h-16',
        'flex items-center',
        'pt-[env(safe-area-inset-top)]',
        'shadow-md'
      )}
    >
      <div className="flex items-center w-full h-full px-4">
        {showBack && (
          <button
            onClick={onBack}
            className={cn(
              'flex items-center justify-center',
              'min-w-[44px] min-h-[44px]',
              'mr-3',
              'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded',
              'transition-opacity hover:opacity-80'
            )}
            aria-label="Retour"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <h1
          className={cn(
            'text-lg font-semibold flex-1',
            showBack ? 'text-left' : 'text-center'
          )}
        >
          {title}
        </h1>
        {/* Espace pour équilibrer le bouton retour */}
        {showBack && <div className="w-11" />}
      </div>
    </header>
  );
}
