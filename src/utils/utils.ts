import { v4 as uuidv4 } from 'uuid'; // Importer la fonction pour générer des UUIDs

/**
 * Exclut des clés spécifiques d'un objet.
 * @param obj - L'objet d'origine.
 * @param keys - Les clés à exclure de l'objet.
 * @returns Un nouvel objet sans les clés spécifiées.
 */
export function excludeKeys<T>(obj: T, keys: (keyof T)[]): Partial<T> {
  const copy = { ...obj }; // Copie de l'objet d'origine
  keys.forEach((key) => {
    delete copy[key]; // Supprime les clés spécifiées
  });
  return copy;
}

export function generateRandomFileName(originalFile: string) {
  const timestamp = Date.now();
  const uid = uuidv4(); // Génère un UID unique
  const extension = originalFile.split('.').pop(); // Récupère l'extension du fichier
  const uniqueName = `${timestamp}@${uid}.${extension}`; // Nom du fichier avec date et UID
  return uniqueName;
}

// Fonction pour nettoyer le nom du fichier
export const sanitizeFileName = (name: string): string => {
  // Supprime tous les caractères spéciaux sauf . et _
  return name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // Supprime les caractères interdits
    .replace(/\s+/g, '_') // Remplace les espaces par des underscores
    .replace(/\.+/g, '.') // Empêche plusieurs points successifs
    .toLowerCase(); // Convertit en minuscule pour éviter la casse
};
