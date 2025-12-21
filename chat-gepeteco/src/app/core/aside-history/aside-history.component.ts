import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileMenuComponent } from "../profile-menu/profile-menu.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-aside-history',
    imports: [CommonModule, ProfileMenuComponent, RouterLink],
    templateUrl: './aside-history.component.html',
    styleUrl: './aside-history.component.css'
})

export class AsideHistoryComponent {
    isSidebarOpen = false;
    @Output() toggleSidebar = new EventEmitter<void>();
    
    toggleSb(): void {
        this.toggleSidebar.emit();
    }
}
