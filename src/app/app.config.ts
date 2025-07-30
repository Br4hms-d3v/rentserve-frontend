import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {GlobalErrorHandler} from './core/error-handler/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideNativeDateAdapter(),
    provideHttpClient(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};
