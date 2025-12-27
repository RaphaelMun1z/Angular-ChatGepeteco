import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ChatEffects } from './store/chat.effects';
import { chatReducer } from './store/chat.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideStore({ chat: chatReducer }),
        provideEffects([ChatEffects]),
    ]
};
