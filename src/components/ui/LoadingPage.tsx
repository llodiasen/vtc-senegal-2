import { Spinner } from './Spinner';
import { cn } from '@/lib/utils/cn';

interface LoadingPageProps {
  /** Message de chargement */
  message?: string;
  /** Type de background */
  background?: 'white' | 'transparent';
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant LoadingPage - Page de chargement full screen
 */
export function LoadingPage({
  message = 'Chargement...',
  background = 'white',
  className,
}: LoadingPageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4',
        background === 'white' ? 'bg-white' : 'bg-transparent',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" />
      {message && (
        <p className="mt-4 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
}
