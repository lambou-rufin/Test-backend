import { diskStorage } from 'multer';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Crée un répertoire si nécessaire
const ensureDirectoryExists = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

/**
 * Crée une configuration Multer dynamique pour une entité donnée.
 * @param entityName Nom de l'entité (ex. 'emissions', 'films')
 * @param subDirectory (optionnel) Sous-dossier spécifique pour les fichiers (ex. 'images', 'videos')
 * @returns La configuration Multer
 */
export const createMulterConfig = (entityName: string, subDirectory = '') => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const baseUploadPath = process.env.UPLOADS_PATH || './uploads';
        const entityUploadPath = `${baseUploadPath}/${entityName}`;
        const uploadPath = subDirectory
          ? `${entityUploadPath}/${subDirectory}`
          : entityUploadPath;

        ensureDirectoryExists(uploadPath);
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const uid = uuidv4(); // Génère un UID unique
        const extension = file.originalname.split('.').pop(); // Récupère l'extension du fichier
        const uniqueName = `${timestamp}@${uid}.${extension}`; // Nom du fichier avec date et UID
        cb(null, uniqueName);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, // 10 Go
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype.startsWith('image/') || // Autorise les images
        file.mimetype.startsWith('video/')
      ) {
        cb(null, true);
      } else {
        cb(new Error('Type de fichier non pris en charge'), false);
      }
    },
  };
};
