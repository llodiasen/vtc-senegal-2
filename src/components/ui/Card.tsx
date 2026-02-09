import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Contenu de la carte */
  children: React.ReactNode;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant Card - Container blanc arrondi avec ombre
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md p-4 sm:p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
