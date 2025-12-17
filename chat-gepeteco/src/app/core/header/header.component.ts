import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})

export class HeaderComponent {
    private uiService = inject(UiService);
    
    toggleSt() {
        this.uiService.toggleSettings();
    }
    
    toggleSb() {
        this.uiService.toggleSidebar();
    }
}
