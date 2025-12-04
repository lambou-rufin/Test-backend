import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'LIMIT_FILE_SIZE') {
      response.status(413).json({
        error: true,
        message: 'Le fichier dépasse la taille maximale autorisée.',
      });
    } else {
      response.status(400).json({
        error: true,
        message:
          exception.message || 'Erreur lors du téléversement du fichier.',
      });
    }
  }
}
