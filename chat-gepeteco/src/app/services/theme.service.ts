import { effect, Injectable, signal } from '@angular/core';

export type ThemeType = 'light' | 'dark' | 'system';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    themeSignal = signal<ThemeType>(
        (localStorage.getItem('theme') as ThemeType) || 'system'
    );
    
    constructor() {
        effect(() => {
            const theme = this.themeSignal();
            
            localStorage.setItem('theme', theme);
            
            const html = document.documentElement;
            html.classList.remove('light', 'dark');
            
            if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.classList.add(systemDark ? 'dark' : 'light');
            } else {
                html.classList.add(theme);
            }
        });
    }
    
    setTheme(theme: ThemeType) {
        this.themeSignal.set(theme);
    }
}