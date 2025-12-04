export class ResponseUtil {
  /**
   * Format pour une réponse de succès
   * @param data le contenu renvoyé
   * @param message message à afficher
   * @param meta informations de pagination (facultatif)
   */
  static success(
    data: any = {},
    message: string = 'Opération réussie',
    meta?: { total: number; page: number; limit: number },
  ) {
    return {
      error: false,
      data,
      message,
      // n’inclure meta que si on a passé un objet
      ...(meta && { meta }),
    };
  }

  /**
   * Format pour une réponse d'erreur
   */
  static error(message: string = "Une erreur s'est produite", data: any = []) {
    return {
      error: true,
      data,
      message,
    };
  }
}
