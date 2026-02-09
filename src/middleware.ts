import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware pour protéger les routes authentifiées
 * Vérifie la présence d'un cookie d'authentification
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Toujours laisser passer la page d'accueil et les assets
  if (pathname === '/' || pathname === '') {
    return NextResponse.next();
  }

  // Routes protégées nécessitant une authentification
  const protectedRoutes = ['/booking', '/history', '/profile'];
  
  // Routes d'authentification (rediriger vers /booking/new si déjà authentifié)
  const authRoutes = ['/auth/login', '/auth/verify'];

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Vérifier si c'est une route d'authentification
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Récupérer le cookie d'authentification
  // Le store Zustand utilise 'auth-storage' dans localStorage
  // Pour le middleware, on vérifie un cookie 'auth-token' ou 'auth-storage'
  const authToken = request.cookies.get('auth-token')?.value;
  const authStorage = request.cookies.get('auth-storage')?.value;

  const isAuthenticated = !!(authToken || authStorage);

  // Si route protégée et non authentifié → rediriger vers login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    // Préserver l'URL de destination pour redirection après login
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si route d'authentification et déjà authentifié → rediriger vers booking
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/booking/new', request.url));
  }

  // Autoriser l'accès
  return NextResponse.next();
}

/**
 * Configuration des routes à protéger par le middleware
 */
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (routes API)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (icône)
     * - public files (fichiers publics)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
