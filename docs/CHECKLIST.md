# Checklist de vérification - scod vtc

Cette checklist permet de vérifier que toutes les fonctionnalités, optimisations PWA, UX et performances sont correctement implémentées.

## FONCTIONNALITÉS

### Authentification
- [ ] Auth : Login avec téléphone
  - [ ] Input téléphone avec formatage automatique
  - [ ] Validation du numéro
  - [ ] Redirection vers `/auth/verify` avec paramètre `phone`
  - [ ] Gestion des erreurs

- [ ] Auth : Vérification OTP
  - [ ] 6 inputs OTP séparés
  - [ ] Auto-focus et navigation au clavier
  - [ ] Support copier-coller
  - [ ] Auto-submit si code complet
  - [ ] Code valide : `123456`
  - [ ] Redirection vers `/booking/new` après succès
  - [ ] Bouton "Renvoyer le code"

### Réservation
- [ ] Booking : Sélection départ/arrivée
  - [ ] Input avec autocomplete (suggestions mock)
  - [ ] Bouton "Ma position" avec géolocalisation
  - [ ] Auto-localisation au mount (optionnel)
  - [ ] Validation départ ≠ arrivée

- [ ] Booking : Calcul prix
  - [ ] Bouton "Calculer le prix" (disabled si adresses manquantes)
  - [ ] Affichage distance, durée, prix
  - [ ] Skeleton loader pendant le calcul
  - [ ] Gestion des erreurs

- [ ] Booking : Confirmation
  - [ ] Bouton "Confirmer la réservation" (disabled si pas d'estimation)
  - [ ] Redirection vers `/booking/[rideId]` après confirmation
  - [ ] Génération d'un `rideId` unique

### Suivi de course
- [ ] Ride : Recherche chauffeur
  - [ ] Statut initial : `searching`
  - [ ] Progress bar animée
  - [ ] Transition automatique `searching` → `assigned` (2s)

- [ ] Ride : Affichage driver
  - [ ] DriverCard affiché après `assigned`
  - [ ] Nom, téléphone, véhicule, plaque, note
  - [ ] Bouton d'appel (placeholder)
  - [ ] Photo du chauffeur (optionnel)

- [ ] Ride : Statuts course
  - [ ] `searching` → `assigned` → `arriving` → `in_progress` → `completed`
  - [ ] Transition `assigned` → `arriving` (3s après assigned)
  - [ ] Mise à jour position chauffeur toutes les 3s (mock)
  - [ ] Affichage temps estimé d'arrivée
  - [ ] Bouton "Annuler" visible pour certains statuts

### Historique
- [ ] History : Liste courses
  - [ ] Affichage de 5 courses mock
  - [ ] Tri par date (plus récent en premier)
  - [ ] Affichage date, départ, arrivée, prix, statut
  - [ ] Badge statut (Terminée/Annulée)
  - [ ] Clic sur une course → redirection `/booking/[id]`
  - [ ] Empty state si aucune course

### Profil
- [ ] Profile : Infos user
  - [ ] Avatar avec initiales
  - [ ] Nom et téléphone formaté
  - [ ] Statistiques (total courses, total dépensé)
  - [ ] Bouton "Modifier le nom" (placeholder, disabled)

- [ ] Profile : Déconnexion
  - [ ] Bouton "Déconnexion"
  - [ ] Appel `logout()` du store
  - [ ] Redirection vers `/auth/login`
  - [ ] Nettoyage du localStorage

## PWA

- [ ] Manifest.json valide
  - [ ] Fichier `/public/manifest.json` existe
  - [ ] Propriétés : `name`, `short_name`, `description`, `start_url`, `display`
  - [ ] `theme_color` : `#10b981`
  - [ ] `background_color` : `#ffffff`
  - [ ] `orientation` : `portrait`
  - [ ] Référence dans `layout.tsx` metadata

- [ ] Service Worker enregistré
  - [ ] Fichier `/public/sw.js` existe
  - [ ] Cache statique (routes principales)
  - [ ] Stratégie Network-First pour API
  - [ ] Stratégie Cache-First pour images
  - [ ] Stale-While-Revalidate pour routes
  - [ ] Offline fallback vers `/offline.html`
  - [ ] Versioning du cache pour invalidation

- [ ] Installable sur mobile
  - [ ] Manifest.json valide
  - [ ] Service Worker actif
  - [ ] Icônes 192x192 et 512x512 présentes
  - [ ] HTTPS requis (en production)
  - [ ] Prompt d'installation visible

- [ ] Icônes 192x192 et 512x512
  - [ ] `/public/icons/icon-192x192.png` existe
  - [ ] `/public/icons/icon-512x512.png` existe
  - [ ] Référencées dans `manifest.json`
  - [ ] Référencées dans `layout.tsx` metadata

- [ ] Offline fallback
  - [ ] Fichier `/public/offline.html` existe
  - [ ] Message "Vous êtes hors ligne"
  - [ ] Bouton "Réessayer"
  - [ ] Service Worker redirige vers cette page si offline

## UX

- [ ] Mobile-first responsive
  - [ ] Design adapté mobile (< 640px)
  - [ ] Touch targets ≥ 44x44px
  - [ ] Safe area iOS (padding-bottom avec `env(safe-area-inset-bottom)`)
  - [ ] Header et BottomNav fixes
  - [ ] Pas de scroll horizontal

- [ ] Loading states partout
  - [ ] Spinner sur boutons avec `isLoading`
  - [ ] Skeleton loaders sur pages (`loading.tsx`)
  - [ ] LoadingPage pour full-screen
  - [ ] Pas de contenu vide pendant chargement

- [ ] Error states partout
  - [ ] `error.tsx` sur chaque route
  - [ ] ErrorMessage component réutilisable
  - [ ] ErrorBoundary global
  - [ ] Messages d'erreur clairs et actionnables
  - [ ] Bouton "Réessayer" quand approprié

- [ ] Offline banner
  - [ ] OfflineBanner affiché en haut quand offline
  - [ ] Message "Connexion perdue - Mode hors ligne"
  - [ ] Disparaît automatiquement quand revient online
  - [ ] Animation slide-down
  - [ ] Safe area iOS

- [ ] Accessibilité clavier
  - [ ] SkipLink visible au focus
  - [ ] Navigation Tab entre éléments interactifs
  - [ ] Support Enter/Espace sur boutons
  - [ ] Focus visible sur tous les éléments
  - [ ] ARIA labels sur boutons icon-only
  - [ ] `aria-live` pour messages dynamiques

## PERFORMANCE

- [ ] Lighthouse > 90
  - [ ] Performance score ≥ 90
  - [ ] Accessibility score ≥ 90
  - [ ] Best Practices score ≥ 90
  - [ ] SEO score ≥ 90
  - [ ] PWA score = 100

- [ ] First Contentful Paint < 2s
  - [ ] FCP mesuré avec Lighthouse
  - [ ] Optimisation images (WebP, AVIF)
  - [ ] Preload font Inter
  - [ ] CSS critique inline si nécessaire

- [ ] Time to Interactive < 3s
  - [ ] TTI mesuré avec Lighthouse
  - [ ] Code splitting (dynamic imports)
  - [ ] Lazy load composants lourds (LiveMap)
  - [ ] Debounce sur AddressInput (300ms)
  - [ ] Minimisation bundle size

## TESTS MANUELS

### 1. Flow complet : Login → Book → Track
- [ ] Ouvrir `/auth/login`
- [ ] Entrer un numéro de téléphone valide
- [ ] Cliquer "Continuer" → redirection `/auth/verify?phone=XXX`
- [ ] Entrer le code OTP `123456`
- [ ] Vérifier redirection `/booking/new`
- [ ] Sélectionner départ et arrivée (ou utiliser "Ma position")
- [ ] Cliquer "Calculer le prix" → voir estimation
- [ ] Cliquer "Confirmer la réservation" → redirection `/booking/[rideId]`
- [ ] Vérifier transitions de statut : searching → assigned → arriving
- [ ] Vérifier affichage DriverCard
- [ ] Vérifier mise à jour position chauffeur (mock)

### 2. Test offline
- [ ] Ouvrir l'application en ligne
- [ ] Activer le mode avion (ou désactiver réseau)
- [ ] Vérifier affichage OfflineBanner
- [ ] Naviguer vers une page → voir `/offline.html` si nécessaire
- [ ] Réactiver le réseau
- [ ] Vérifier disparition du banner
- [ ] Vérifier que l'app fonctionne normalement

### 3. Test installation PWA
- [ ] Ouvrir l'app dans Chrome/Edge mobile
- [ ] Vérifier prompt "Ajouter à l'écran d'accueil"
- [ ] Installer l'app
- [ ] Lancer depuis l'icône sur l'écran d'accueil
- [ ] Vérifier que l'app s'ouvre en standalone (sans barre d'adresse)
- [ ] Vérifier que le thème color correspond (#10b981)
- [ ] Vérifier que les icônes sont correctes

### 4. Test sur mobile réel
- [ ] Tester sur iOS (Safari)
  - [ ] Vérifier safe area (notch)
  - [ ] Vérifier installation PWA
  - [ ] Tester géolocalisation
  - [ ] Vérifier performance

- [ ] Tester sur Android (Chrome)
  - [ ] Vérifier installation PWA
  - [ ] Tester géolocalisation
  - [ ] Vérifier performance
  - [ ] Vérifier Service Worker

- [ ] Tester fonctionnalités spécifiques
  - [ ] Géolocalisation "Ma position"
  - [ ] Auto-localisation au mount
  - [ ] Navigation clavier (si clavier externe)
  - [ ] Gestes tactiles (swipe, tap)

## NOTES

- Les icônes PWA sont des placeholders et doivent être remplacées par de vraies icônes
- Le Service Worker doit être enregistré dans un composant client (à faire si pas déjà fait)
- Les tests de performance doivent être effectués sur un réseau 3G simulé
- Tous les tests doivent être effectués sur un appareil réel, pas seulement en émulation
