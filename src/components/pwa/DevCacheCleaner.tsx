'use client';

import { useEffect } from 'react';

/**
 * En développement : désinscrit le Service Worker et vide le cache,
 * puis recharge une fois pour afficher le contenu à jour.
 */
export function DevCacheCleaner() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
    if (sessionStorage.getItem('dev-cache-cleaned')) return;

    const clean = async () => {
      let needsReload = false;
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        if (regs.length > 0) {
          await Promise.all(regs.map((r) => r.unregister()));
          needsReload = true;
        }
      }
      if ('caches' in window) {
        const names = await caches.keys();
        if (names.length > 0) {
          await Promise.all(names.map((n) => caches.delete(n)));
          needsReload = true;
        }
      }
      if (needsReload) {
        sessionStorage.setItem('dev-cache-cleaned', '1');
        window.location.reload();
      }
    };
    clean();
  }, []);
  return null;
}
