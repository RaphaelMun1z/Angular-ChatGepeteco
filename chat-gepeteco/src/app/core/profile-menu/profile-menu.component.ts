import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { PopupGeneralOptionsComponent } from "../popup-general-options/popup-general-options.component";

@Component({
    selector: 'app-profile-menu',
    imports: [CommonModule, PopupGeneralOptionsComponent],
    templateUrl: './profile-menu.component.html',
    styleUrl: './profile-menu.component.css'
})

export class ProfileMenuComponent {
    @Input() isCollapsed = false;
    
    public uiService = inject(UiService);
    
    closeSidebar() {
        this.uiService.toggleSidebar();
    }
    
    togglePopup() {
        this.uiService.toggleProfileSettingsModal();
    }
}
