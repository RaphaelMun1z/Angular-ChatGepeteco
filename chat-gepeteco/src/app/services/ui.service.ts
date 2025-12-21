import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UiService {
    isSettingsOpen = signal(false);
    isSidebarOpen = signal(false);
    isProfileSettingsModalOpen = signal(false);

    toggleSettings() {
        this.isSettingsOpen.update(val => !val);
    }
    
    toggleSidebar() {
        this.isSidebarOpen.update(val => !val);
    }
    
    toggleProfileSettingsModal() {
        this.isProfileSettingsModalOpen.update(val => !val);
    }
}
