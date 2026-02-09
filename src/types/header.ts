// types/header.ts
// Types pour le composant Header

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
  badge?: string; // Pour afficher un badge (ex: "Nouveau")
  external?: boolean; // Lien externe (ouvre dans un nouvel onglet)
}

export interface Language {
  code: string; // 'fr', 'en', etc.
  label: string; // 'Français', 'English', etc.
  flag: string; // URL ou composant pour le drapeau
}

export interface HeaderProps {
  variant?: 'default' | 'transparent' | 'solid';
  sticky?: boolean;
  showSearch?: boolean;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isAuthenticated: boolean;
  user: User | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'passenger' | 'driver' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Types pour les événements du header
export type HeaderEvent = 
  | 'navigation'
  | 'auth'
  | 'language-change'
  | 'menu-toggle'
  | 'dropdown-open'
  | 'dropdown-close';

export interface HeaderEventData {
  type: HeaderEvent;
  payload?: any;
}

// Constantes
export const HEADER_HEIGHT = {
  mobile: 64, // 16 * 4 = 64px
  desktop: 80, // 20 * 4 = 80px
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const LANGUAGES: Language[] = [
  {
    code: 'fr',
    label: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'en',
    label: 'English',
    flag: '🇬🇧',
  },
];

// Helper type pour les classes Tailwind
export type TailwindColor = 
  | 'primary'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'green'
  | 'purple'
  | 'pink'
  | 'gray';

export type TailwindShade = 
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

// Type pour les routes de navigation
export type NavigationRoute = 
  | '/'
  | '/booking/new'
  | '/commander/taxi'
  | '/commander/vtc'
  | '/commander/moto'
  | '/entreprise/hotellerie'
  | '/entreprise/booking-partners'
  | '/entreprise/assisteurs'
  | '/entreprise/corporate'
  | '/pourquoi-scod-vtc'
  | '/devenir-chauffeur'
  | '/aide'
  | '/auth/login'
  | '/auth/register'
  | '/dashboard';

// Type guard pour vérifier si un utilisateur est authentifié
export function isAuthenticated(authState: AuthState): authState is AuthState & { user: User } {
  return authState.isAuthenticated && authState.user !== null;
}

// Type guard pour vérifier le rôle d'un utilisateur
export function isDriver(user: User | null): user is User & { role: 'driver' } {
  return user !== null && user.role === 'driver';
}

export function isPassenger(user: User | null): user is User & { role: 'passenger' } {
  return user !== null && user.role === 'passenger';
}

export function isAdmin(user: User | null): user is User & { role: 'admin' } {
  return user !== null && user.role === 'admin';
}
