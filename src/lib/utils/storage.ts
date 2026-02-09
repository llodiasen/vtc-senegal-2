/**
 * Vérifie si localStorage est disponible dans l'environnement actuel
 * @returns true si localStorage est disponible, false sinon
 */
function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false; // Environnement serveur (SSR)
    }

    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sauvegarde une valeur dans le localStorage avec gestion d'erreurs
 * @param key - Clé de stockage
 * @param value - Valeur à sauvegarder (sera sérialisée en JSON si c'est un objet)
 */
export function saveToStorage(key: string, value: any): void {
  // Gestion des cas limites
  if (!key || typeof key !== 'string') {
    console.warn('saveToStorage: clé invalide');
    return;
  }

  // Vérification de la disponibilité de localStorage
  if (!isStorageAvailable()) {
    console.warn('saveToStorage: localStorage indisponible');
    return;
  }

  try {
    // Sérialisation en JSON pour les objets, sinon conversion en string
    const serializedValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    // Gestion des erreurs (quota dépassé, etc.)
    console.error('saveToStorage: erreur lors de la sauvegarde', error);
  }
}

/**
 * Récupère une valeur du localStorage avec gestion d'erreurs
 * @param key - Clé de stockage
 * @returns Valeur désérialisée ou null si la clé n'existe pas ou en cas d'erreur
 */
export function getFromStorage<T>(key: string): T | null {
  // Gestion des cas limites
  if (!key || typeof key !== 'string') {
    console.warn('getFromStorage: clé invalide');
    return null;
  }

  // Vérification de la disponibilité de localStorage
  if (!isStorageAvailable()) {
    console.warn('getFromStorage: localStorage indisponible');
    return null;
  }

  try {
    const item = localStorage.getItem(key);

    // Si la clé n'existe pas
    if (item === null) {
      return null;
    }

    // Tentative de désérialisation JSON
    try {
      return JSON.parse(item) as T;
    } catch {
      // Si le parsing échoue, retourner la valeur brute (string)
      return item as T;
    }
  } catch (error) {
    // Gestion des erreurs
    console.error('getFromStorage: erreur lors de la récupération', error);
    return null;
  }
}

/**
 * Supprime une valeur du localStorage avec gestion d'erreurs
 * @param key - Clé de stockage à supprimer
 */
export function removeFromStorage(key: string): void {
  // Gestion des cas limites
  if (!key || typeof key !== 'string') {
    console.warn('removeFromStorage: clé invalide');
    return;
  }

  // Vérification de la disponibilité de localStorage
  if (!isStorageAvailable()) {
    console.warn('removeFromStorage: localStorage indisponible');
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Gestion d'erreurs silencieuse (pas de log pour éviter le spam)
    // localStorage.removeItem ne devrait normalement pas échouer
  }
}
