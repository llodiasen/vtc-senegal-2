/**
 * Formate un numéro de téléphone au format international sénégalais
 * @param phone - Numéro de téléphone (peut être dans différents formats)
 * @returns Numéro formaté au format "+221 77 123 45 67"
 */
export function formatPhoneNumber(phone: string): string {
  // Gestion des cas limites
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  // Suppression de tous les caractères non numériques
  const digitsOnly = phone.replace(/\D/g, '');

  // Vérification de la longueur minimale
  if (digitsOnly.length < 9) {
    return phone; // Retourne le numéro original si invalide
  }

  // Si le numéro commence par 221 (code pays), on le garde
  // Sinon, on ajoute le code pays 221
  let formatted = digitsOnly;
  if (!digitsOnly.startsWith('221')) {
    formatted = `221${digitsOnly}`;
  }

  // Formatage : +221 XX XXX XX XX
  // On prend les 2 premiers chiffres après 221 (l'opérateur)
  // Puis on groupe le reste par 3 chiffres
  if (formatted.length >= 12) {
    const countryCode = formatted.substring(0, 3);
    const operator = formatted.substring(3, 5);
    const part1 = formatted.substring(5, 8);
    const part2 = formatted.substring(8, 10);
    const part3 = formatted.substring(10, 12);

    return `+${countryCode} ${operator} ${part1} ${part2} ${part3}`;
  }

  // Format alternatif si le numéro est plus court
  return `+${formatted}`;
}

/**
 * Formate une durée en minutes vers une chaîne lisible
 * @param minutes - Durée en minutes (ou en secondes si < 60)
 * @returns Durée formatée au format "45 min" ou "1h 30min"
 */
export function formatDuration(minutes: number): string {
  // Gestion des cas limites
  if (minutes == null || isNaN(minutes)) {
    return '0 min';
  }

  // Conversion en valeur positive
  const safeMinutes = Math.max(0, minutes);

  // Si la valeur est < 60, on considère que c'est déjà en minutes
  // Sinon, on convertit les secondes en minutes
  let totalMinutes = safeMinutes;
  if (safeMinutes >= 60 && safeMinutes < 3600) {
    // Probablement en secondes, conversion en minutes
    totalMinutes = Math.round(safeMinutes / 60);
  }

  // Si moins d'une heure, afficher uniquement les minutes
  if (totalMinutes < 60) {
    return `${Math.round(totalMinutes)} min`;
  }

  // Calcul des heures et minutes restantes
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = Math.round(totalMinutes % 60);

  // Formatage : "1h 30min" ou "2h" si pas de minutes
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Formate une distance en kilomètres vers une chaîne lisible
 * @param km - Distance en kilomètres (ou en mètres si < 1)
 * @returns Distance formatée au format "500 m" ou "8.5 km"
 */
export function formatDistance(km: number): string {
  // Gestion des cas limites
  if (km == null || isNaN(km)) {
    return '0 m';
  }

  // Conversion en valeur positive
  const safeKm = Math.max(0, km);

  // Si la valeur est < 1, on considère que c'est déjà en kilomètres
  // Sinon, on vérifie si c'est en mètres (valeur > 1000 pourrait être en mètres)
  let distanceInKm = safeKm;
  if (safeKm >= 1 && safeKm < 1000) {
    // Probablement déjà en km
    distanceInKm = safeKm;
  } else if (safeKm >= 1000) {
    // Probablement en mètres, conversion en km
    distanceInKm = safeKm / 1000;
  }

  // Si moins d'un kilomètre, afficher en mètres
  if (distanceInKm < 1) {
    const meters = Math.round(safeKm < 1 ? safeKm * 1000 : safeKm);
    return `${meters} m`;
  }

  // Formatage en kilomètres avec 1 décimale
  const formattedKm = distanceInKm.toFixed(1);
  // Suppression du .0 si c'est un nombre entier
  const cleanKm = formattedKm.endsWith('.0')
    ? formattedKm.slice(0, -2)
    : formattedKm;

  return `${cleanKm} km`;
}
