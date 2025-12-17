import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { UiService } from '../../services/ui.service';

@Component({
    selector: 'app-modal-config',
    imports: [CommonModule],
    templateUrl: './modal-config.component.html',
    styleUrl: './modal-config.component.css'
})

export class ModalConfigComponent {
    private themeService = inject(ThemeService);
    public uiService = inject(UiService);
    
    isDarkMode = computed(() => this.themeService.themeSignal() === 'dark');
    
    toggleSettings() {
        this.uiService.toggleSettings();
    }
    
    setTheme(theme: 'light' | 'dark') {
        this.themeService.setTheme(theme);
    }
}
