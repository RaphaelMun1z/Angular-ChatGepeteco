import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileMenuComponent } from "../profile-menu/profile-menu.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { ConversationItemComponent } from "./conversation-item/conversation-item.component";

@Component({
    selector: 'app-aside-history',
    imports: [CommonModule, ProfileMenuComponent, RouterLink, ConversationItemComponent, RouterLinkActive],
    templateUrl: './aside-history.component.html',
    styleUrl: './aside-history.component.css'
})

export class AsideHistoryComponent {
    myItems = [
        { 
            title: 'Doc. do Projeto', 
            icon: 'fa-regular fa-file-lines', 
            colorClass: 'text-blue-600 dark:text-blue-400' 
        },
        { 
            title: 'Ativ. Prática...', 
            icon: 'fa-solid fa-code', 
            colorClass: 'text-green-600 dark:text-green-400' 
        },
        { 
            title: 'Proj. Angular', 
            icon: 'fa-solid fa-code', 
            colorClass: 'text-green-600 dark:text-green-400' 
        }
    ];
    
    gems = [
        {
            label: 'Parceiro de Programação',
            icon: 'fa-regular fa-gem',
            colorClass: 'text-purple-600 dark:text-purple-400'
        }
    ];
    
    chatHistory = [
        { id: 'a071d7a6-62c3-4752-8326-2aad65fb2ce7', title: 'Histórico 01', route: '/c/a071d7a6-62c3-4752-8326-2aad65fb2ce7', isPinned: true },
        { id: '2', title: 'Histórico 02', route: '/c/2', isPinned: false },
        { id: '3', title: 'Histórico 03', route: '/c/3', isPinned: false },
    ];
    
    constructor(public uiService: UiService) {}
    
    toggleMenu() {
        this.toggleSb(); 
    }
    
    toggleSb() {
        this.uiService.toggleSidebar();
    }
}
