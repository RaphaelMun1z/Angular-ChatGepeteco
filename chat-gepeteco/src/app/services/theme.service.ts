import { effect, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    themeSignal = signal<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );
    
    constructor() {
        effect(() => {
            const theme = this.themeSignal();
            
            // Remove classes antigas e adiciona a nova na raiz (<html>)
            const html = document.documentElement;
            html.classList.remove('light', 'dark');
            html.classList.add(theme);
            
            // Salva no LocalStorage para persistir após refresh
            localStorage.setItem('theme', theme);
        });
    }
    
    setTheme(theme: 'light' | 'dark') {
        this.themeSignal.set(theme);
    }
}
