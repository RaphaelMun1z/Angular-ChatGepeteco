import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

interface MenuItem {
    label: string;
    icon: string;
    action?: () => void;
    separatorAbove?: boolean;
    children?: MenuItem[];
}

@Component({
    selector: 'app-popup-general-options',
    imports: [CommonModule],
    templateUrl: './popup-general-options.component.html',
    styleUrl: './popup-general-options.component.css'
})

export class PopupGeneralOptionsComponent {
    public themeService = inject(ThemeService);
    
    activeSubMenu: string | null = null;
    
    menuItems: MenuItem[] = [
        { label: 'Atividade', icon: 'fa-solid fa-clock-rotate-left' },
        { 
            label: 'Tema', 
            icon: 'fa-regular fa-sun',
            children: [
                { 
                    label: 'Claro', 
                    icon: 'fa-regular fa-sun', 
                    action: () => this.themeService.setTheme('light') 
                },
                { 
                    label: 'Escuro', 
                    icon: 'fa-solid fa-moon', 
                    action: () => this.themeService.setTheme('dark') 
                },
                { 
                    label: 'Padrão do sistema', 
                    icon: 'fa-solid fa-desktop', 
                    action: () => this.themeService.setTheme('system') 
                }
            ]
        },
        { 
            label: 'Gerenciar assinatura', 
            icon: 'fa-regular fa-circle-check', 
            separatorAbove: true 
        },
        { label: 'Upgrade para Google AI Ultra', icon: 'fa-solid fa-wand-magic-sparkles' },
        { label: 'Enviar feedback', icon: 'fa-regular fa-message' },
        { 
            label: 'Ajuda', 
            icon: 'fa-regular fa-circle-question',
            children: [
                { label: 'Central de Ajuda', icon: 'fa-solid fa-magnifying-glass' },
                { label: 'Comunidade', icon: 'fa-solid fa-comment-dots' }
            ]
        }
    ];
    
    isThemeActive(label: string): boolean {
        const current = this.themeService.themeSignal();
        
        if (label === 'Claro') return current === 'light';
        if (label === 'Escuro') return current === 'dark';
        if (label === 'Padrão do sistema') return current === 'system';
        
        return false;
    }
    
    handleAction(item: MenuItem) {
        if (item.children) {
            this.toggleSubMenu(item.label);
        } else {
            console.log('Ação:', item.label);
            if (item.action) item.action();
            this.activeSubMenu = null;
        }
    }
    
    toggleSubMenu(label: string) {
        if (this.activeSubMenu === label) {
            this.activeSubMenu = null;
        } else {
            this.activeSubMenu = label;
        }
    }
}
