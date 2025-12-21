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
    chatHistory = [
        { id: '1', title: 'Planejamento Projeto EDII', route: '/c/1', isPinned: true },
        { id: '2', title: 'Modificação do Aside', route: '/c/2', isPinned: false },
        { id: '3', title: 'Scrapy Spider para Vagas', route: '/c/3', isPinned: false },
    ];
    
    constructor(public uiService: UiService) {}
    
    toggleMenu() {
        this.toggleSb(); 
    }
    
    toggleSb() {
        this.uiService.toggleSidebar();
    }
}
