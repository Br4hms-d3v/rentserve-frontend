import {ErrorHandler, Injectable, Injector} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor() {
  }

  /**
   * Handle errors from backend or other sources.
   */
  handleError(error: any): void {
    let message = 'Une erreur est survenue!'; // Default message if nothing is found

    // Check if error is an HTTP error (from backend)
    if (error instanceof HttpErrorResponse) {
      const status = error.status;

      // If the backend sent a simple string
      if (typeof error.error === 'string') {
        message = error.error;
      } else if (error.error?.message) { // If the backend sent an object with a "message"
        message = error.error.message;
      } else if (error.message) { // If Angular gave a default message
        message = error.message;
      }

      // Check the status code to show the right console message
      switch (status) {
        case 403:
          console.warn('Erreur 403 - Compte non activé:', message);
          break;
        case 302:
          console.warn('Erreur 302 - Email ou pseudo existant:', message);
          break;
        case 404:
          console.warn('Erreur 404 - Non trouvé:', message);
          break;
        case 401:
          console.warn('Erreur 401 - Mot de passe invalide:', message);
          break;
        case 400:
          console.warn('Erreur 400 - Requête incorrecte:', message);
          break;
        default:
          console.error('Erreur HTTP inattendue:', message);
      }
      // If the error is not from HTTP
    } else {
      console.error('Erreur inattendue:', error);
    }
  }
}
