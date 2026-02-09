import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { OfflineBanner } from '@/components/ui';
import { SkipLink, Footer } from '@/components/layout';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { DevCacheCleaner } from '@/components/pwa/DevCacheCleaner';

const isDev = process.env.NODE_ENV === 'development';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'scod vtc - Réservation',
  description: 'Application de réservation VTC au Sénégal. Réservez votre course rapidement et facilement.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'scod vtc',
  },
  themeColor: '#002060',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    title: 'scod vtc - Réservation',
    description: 'Application de réservation VTC au Sénégal. Réservez votre course rapidement et facilement.',
    url: 'https://vtc-senegal.com',
    siteName: 'SCOD VTC',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SCOD VTC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'scod vtc - Réservation',
    description: 'Application de réservation VTC au Sénégal. Réservez votre course rapidement et facilement.',
    images: ['/logo.png'],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#002060',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={inter.className}>
        {isDev && <DevCacheCleaner />}
        {!isDev && <ServiceWorkerRegistration />}
        <SkipLink />
        <OfflineBanner />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
