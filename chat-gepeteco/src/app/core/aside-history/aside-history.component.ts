import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileMenuComponent } from "../profile-menu/profile-menu.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { ConversationItemComponent } from "./conversation-item/conversation-item.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatListItem } from '../../models/chat.model';
import { selectChatList } from '../../store/chat.selectors';
import { loadChatList } from '../../store/chat.actions';

@Component({
    selector: 'app-aside-history',
    imports: [CommonModule, ProfileMenuComponent, RouterLink, ConversationItemComponent, RouterLinkActive],
    templateUrl: './aside-history.component.html',
    styleUrl: './aside-history.component.css'
})

export class AsideHistoryComponent implements OnInit {
    private store = inject(Store);
    public uiService = inject(UiService);
    
    chats$: Observable<ChatListItem[]> = this.store.select(selectChatList);
    
    ngOnInit() {
        this.store.dispatch(loadChatList());
    }
    
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
    
    toggleMenu() {
        this.toggleSb(); 
    }
    
    toggleSb() {
        this.uiService.toggleSidebar();
    }
}
