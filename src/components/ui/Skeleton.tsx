import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  /** Largeur du skeleton */
  width?: string | number;
  /** Hauteur du skeleton */
  height?: string | number;
  /** Classes CSS supplémentaires */
  className?: string;
  /** Type d'arrondi */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Composant Skeleton - Placeholder animé pour le chargement
 */
export function Skeleton({
  width,
  height,
  className,
  rounded = 'md',
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        roundedClasses[rounded],
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
      aria-hidden="true"
    />
  );
}
