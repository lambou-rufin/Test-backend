import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { extname } from 'path';

@Injectable()
export class FileTypeFilterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Utilise req.originalUrl pour récupérer l'URL complète
    const fileExtension = extname(req.originalUrl).toLowerCase();

    // Liste des extensions de fichiers autorisées (images seulement)
    const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    // Vérifier si l'extension est une image
    if (allowedImageExtensions.includes(fileExtension)) {
      return next(); // L'image est autorisée, passer au middleware suivant
    }

    // Si ce n'est pas une image, on renvoie une erreur 403 (Accès interdit)
    res.status(403).json({
      error: true,
      statusCode: 403,
      message: 'Accès interdit à cette ressource',
    });
  }
}
