'use client';

import { cn } from '@/lib/utils/cn';

interface SkipLinkProps {
  /** ID de l'élément cible (contenu principal) */
  targetId?: string;
  /** Texte du lien */
  text?: string;
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant SkipLink - Lien pour sauter au contenu principal (accessibilité)
 * Visible uniquement au focus (keyboard navigation)
 */
export function SkipLink({
  targetId = 'main-content',
  text = 'Aller au contenu principal',
  className,
}: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        'sr-only focus:not-sr-only',
        'absolute top-4 left-4 z-50',
        'px-4 py-2',
        'bg-primary-600 text-white',
        'rounded-lg',
        'font-medium',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'transition-all',
        className
      )}
      aria-label={text}
    >
      {text}
    </a>
  );
}
