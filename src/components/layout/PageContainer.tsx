import { cn } from '@/lib/utils/cn';

interface PageContainerProps {
  /** Contenu de la page */
  children: React.ReactNode;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant PageContainer - Wrapper pour le contenu de la page
 * Gère l'espace pour le Header fixe et le BottomNav fixe
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'w-full',
        'px-4 py-4 sm:py-6',
        'pt-20 pb-24', // Espace pour Header (h-16) et BottomNav (h-16)
        'max-w-4xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
