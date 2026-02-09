# scod vtc - Application de Réservation

Application de réservation VTC (Véhicule de Tourisme avec Chauffeur) pour le Sénégal, construite avec Next.js 15+ et App Router.

## 🚀 Technologies

- **Next.js 15.5+** avec App Router
- **TypeScript**
- **Tailwind CSS** avec thème emerald
- **Zustand** pour la gestion d'état
- **@vis.gl/react-google-maps** pour l'intégration Google Maps
- **Lucide React** pour les icônes
- **PWA** (Progressive Web App) avec Service Worker

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
src/
├── app/              # App Router (Next.js 15+)
│   ├── auth/         # Pages d'authentification
│   ├── booking/      # Pages de réservation
│   └── ...
├── components/       # Composants React
│   ├── home/         # Composants de la page d'accueil
│   ├── booking/      # Composants de réservation
│   └── ...
├── lib/             # Utilitaires et helpers
│   ├── store/        # Stores Zustand
│   └── utils/        # Fonctions utilitaires
└── styles/           # Styles globaux
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez votre dépôt GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Ajoutez vos variables d'environnement dans les paramètres du projet
4. Le déploiement se fera automatiquement à chaque push

### Variables d'environnement

Créez un fichier `.env.local` basé sur `env.example` :

```bash
cp env.example .env.local
```

Puis configurez vos variables d'environnement.

## 📝 License

Ce projet est privé.
