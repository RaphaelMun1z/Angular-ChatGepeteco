import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
    selector: 'app-profile-menu',
    imports: [CommonModule],
    templateUrl: './profile-menu.component.html',
    styleUrl: './profile-menu.component.css'
})

export class ProfileMenuComponent {
    public uiService = inject(UiService);
    
    isMenuOpen = false;
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
    
    closeSidebar() {
        this.uiService.toggleSidebar();
    }
}
