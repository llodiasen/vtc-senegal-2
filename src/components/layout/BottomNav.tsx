import { cn } from '@/lib/utils/cn';

export type TabType = 'home' | 'history' | 'profile';

interface BottomNavProps {
  /** Onglet actuellement actif */
  activeTab: TabType;
  /** Callback appelé lors du changement d'onglet */
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Accueil',
    icon: (
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: 'history',
    label: 'Historique',
    icon: (
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: (
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

/**
 * Composant BottomNav - Navigation fixe en bas de l'écran
 */
export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white border-t border-gray-200',
        'pb-[env(safe-area-inset-bottom)]',
        'shadow-lg'
      )}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-1',
                'min-w-[44px] min-h-[44px] px-4',
                'transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded',
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={cn('transition-colors', isActive && 'text-primary-600')}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
