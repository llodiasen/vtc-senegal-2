import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

interface ErrorMessageProps {
  /** Message d'erreur à afficher */
  message: string;
  /** Fonction appelée lors du clic sur "Réessayer" */
  onRetry?: () => void;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant ErrorMessage - Affichage d'erreur avec option de réessayer
 */
export function ErrorMessage({
  message,
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-6 text-center',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icône d'erreur */}
      <div className="flex-shrink-0">
        <svg
          className="w-12 h-12 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Message d'erreur */}
      <p className="text-red-600 font-medium">{message}</p>

      {/* Bouton Réessayer */}
      {onRetry && (
        <Button variant="outline" size="md" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  );
}
