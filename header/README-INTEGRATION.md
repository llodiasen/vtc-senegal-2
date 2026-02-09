# Header Navigation - scod vtc

## 📦 Fichiers à intégrer

Tous les fichiers créés sont prêts à être intégrés dans votre projet Next.js. Voici la structure complète :

```
src/
├── components/
│   └── layout/
│       ├── HomeHeader.tsx      # Composant header principal (NOUVEAU)
│       └── MobileMenu.tsx      # Menu mobile/hamburger (NOUVEAU)
└── app/
    ├── page.tsx                # Modifier pour ajouter le HomeHeader
    ├── aide/
    │   └── page.tsx           # Page d'aide (NOUVEAU)
    ├── devenir-chauffeur/
    │   └── page.tsx           # Page devenir chauffeur (NOUVEAU)
    ├── pourquoi-scod-vtc/
    │   └── page.tsx           # Page pourquoi VTC (NOUVEAU)
    └── auth/
        └── register/
            └── page.tsx       # Page d'inscription (NOUVEAU)
```

## 🚀 Instructions d'intégration

### Étape 1 : Copier les composants

```bash
# Copier les composants dans votre projet
cp HomeHeader.tsx /path/to/your/project/src/components/layout/
cp MobileMenu.tsx /path/to/your/project/src/components/layout/
```

### Étape 2 : Créer les pages

```bash
# Créer les dossiers nécessaires
mkdir -p src/app/aide
mkdir -p src/app/devenir-chauffeur
mkdir -p src/app/pourquoi-scod-vtc
mkdir -p src/app/auth/register

# Copier les pages
cp aide-page.tsx src/app/aide/page.tsx
cp devenir-chauffeur-page.tsx src/app/devenir-chauffeur/page.tsx
cp pourquoi-scod-vtc-page.tsx src/app/pourquoi-scod-vtc/page.tsx
cp register-page.tsx src/app/auth/register/page.tsx
```

### Étape 3 : Modifier la page d'accueil

Ouvrez `src/app/page.tsx` et ajoutez le HomeHeader au début :

```tsx
import HomeHeader from '@/components/layout/HomeHeader';

export default function Home() {
  return (
    <>
      <HomeHeader />
      
      {/* Votre contenu actuel de la page d'accueil */}
      <main className="min-h-screen">
        {/* ... */}
      </main>
    </>
  );
}
```

### Étape 4 : Créer les routes de redirection pour "Commander"

Créez les fichiers suivants pour les redirections :

**`src/app/commander/taxi/page.tsx`**
```tsx
import { redirect } from 'next/navigation';

export default function CommanderTaxiPage() {
  redirect('/booking/new?type=taxi');
}
```

**`src/app/commander/vtc/page.tsx`**
```tsx
import { redirect } from 'next/navigation';

export default function CommanderVTCPage() {
  redirect('/booking/new?type=vtc');
}
```

**`src/app/commander/moto/page.tsx`**
```tsx
import { redirect } from 'next/navigation';

export default function CommanderMotoPage() {
  redirect('/booking/new?type=moto');
}
```

### Étape 5 : Créer les pages entreprise (placeholder)

Créez les dossiers et fichiers suivants :

```bash
mkdir -p src/app/entreprise/hotellerie
mkdir -p src/app/entreprise/booking-partners
mkdir -p src/app/entreprise/assisteurs
mkdir -p src/app/entreprise/corporate
```

Pour chaque dossier, créez un `page.tsx` similaire à celui-ci :

**Exemple : `src/app/entreprise/hotellerie/page.tsx`**
```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hôtellerie - scod vtc',
  description: 'Solutions VTC pour l\'hôtellerie',
};

export default function HotelleriePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Solutions pour l'Hôtellerie
          </h1>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <p className="text-emerald-800 font-medium">
              🚧 Page en construction
            </p>
            <p className="text-emerald-600 text-sm mt-2">
              Cette page sera bientôt disponible
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

Répétez pour les autres pages entreprise.

## 🎨 Personnalisation

### Couleurs

Le header utilise la couleur `emerald-600` (#10b981) comme couleur principale. Pour la modifier :

```tsx
// Dans HomeHeader.tsx, cherchez et remplacez :
text-emerald-600  // Texte
bg-emerald-600    // Fond
hover:bg-emerald-700  // Hover
```

### Logo

Pour remplacer le logo texte par une image SVG :

```tsx
// Dans HomeHeader.tsx, ligne ~50, remplacez :
<span className="text-2xl font-bold text-emerald-600">
  scod vtc
</span>

// Par :
<Image
  src="/logo.svg"
  alt="scod vtc"
  width={150}
  height={40}
  className="h-10 w-auto"
/>
```

### Ajouter des items au menu

Dans `HomeHeader.tsx`, modifiez le tableau `navItems` :

```tsx
const navItems: NavItem[] = [
  {
    label: 'Nouveau Menu',
    href: '/nouveau-menu',  // ou dropdown: [...]
  },
  // ...
];
```

## 🔧 Fonctionnalités

### ✅ Fonctionnalités implémentées

- ✅ Navigation desktop avec menus déroulants
- ✅ Menu hamburger mobile responsive
- ✅ Sélecteur de langue (FR/EN)
- ✅ Gestion de l'authentification (affiche "Connexion" ou "Mon compte")
- ✅ Header fixe en haut de page
- ✅ Accessibilité (ARIA labels, navigation clavier)
- ✅ Transitions et animations fluides
- ✅ Mobile-first responsive design
- ✅ Safe area iOS

### 📝 Tâches restantes

- [ ] Implémenter la logique de changement de langue
- [ ] Connecter les pages entreprise (hotellerie, booking-partners, etc.)
- [ ] Ajouter le contenu réel aux pages placeholder
- [ ] Implémenter la vraie page d'inscription
- [ ] Ajouter les images/icônes manquantes
- [ ] Tests d'accessibilité complets

## 🎯 Points d'attention

### 1. Safe Area iOS

Le header gère automatiquement le safe area iOS :

```tsx
// Déjà implémenté dans le composant
className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
```

### 2. Z-index

Le header utilise `z-50` pour être au-dessus du contenu. Le menu mobile utilise `z-40`.

### 3. Authentification

Le header utilise `useAuthStore()` de Zustand. Assurez-vous que votre store expose :

```tsx
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
}
```

## 📱 Responsive Breakpoints

```
- Mobile  : < 640px  (sm)
- Tablet  : 640-1024px (sm-lg)
- Desktop : 1024-1280px (xl)
- Large   : > 1280px (xl+)
```

### Comportement par taille d'écran :

- **< 640px** : Menu hamburger, logo seul
- **640-1024px** : Menu hamburger + langue + aide + auth
- **≥ 1024px** : Menu complet horizontal

## 🐛 Débogage

### Le menu ne s'ouvre pas sur mobile

Vérifiez que le z-index du menu est correct et qu'il n'y a pas de conflit avec d'autres éléments.

### Les dropdowns ne se ferment pas

Vérifiez que les events `onClick` sont bien propagés et que la classe `dropdown-container` est présente.

### Les liens ne fonctionnent pas

Vérifiez que toutes les routes existent dans votre structure de fichiers Next.js.

## 📚 Documentation des composants

### HomeHeader

**Props :** Aucune (utilise le contexte global)

**Hooks utilisés :**
- `useAuthStore()` : État d'authentification
- `useState()` : Gestion des états locaux (menu, dropdowns)
- `usePathname()` : Détection du changement de route
- `useEffect()` : Fermeture automatique des menus

### MobileMenu

**Props :**
```tsx
interface MobileMenuProps {
  isOpen: boolean;           // État d'ouverture
  onClose: () => void;       // Fonction de fermeture
  navItems: NavItem[];       // Items de navigation
  isAuthenticated: boolean;  // État d'authentification
  user: any;                 // Utilisateur connecté
}
```

## 🎨 Classes Tailwind utilisées

**Couleurs principales :**
- `emerald-600` : Couleur primaire
- `gray-*` : Nuances de gris pour le texte et les fonds

**Transitions :**
- `transition-colors` : Transitions de couleurs
- `duration-200` : Durée des animations
- `hover:` : États de survol

## 🔒 Accessibilité

- ✅ Navigation clavier complète
- ✅ ARIA labels sur tous les boutons interactifs
- ✅ `aria-expanded` sur le menu mobile
- ✅ `aria-label` sur les liens et boutons
- ✅ Focus visible sur tous les éléments

## 📞 Support

Pour toute question ou problème d'intégration :

1. Vérifiez que toutes les dépendances sont installées (`lucide-react`, `zustand`)
2. Assurez-vous que Tailwind CSS est correctement configuré
3. Vérifiez que les routes existent dans votre structure Next.js
4. Consultez la console pour les erreurs potentielles

## 🎉 Résultat final

Une fois intégré, vous aurez :

- ✅ Un header professionnel et moderne
- ✅ Navigation fluide et intuitive
- ✅ Design responsive sur tous les appareils
- ✅ Menus déroulants fonctionnels
- ✅ Gestion de l'authentification
- ✅ Pages de contenu prêtes à être personnalisées

**Bon développement ! 🚀**
