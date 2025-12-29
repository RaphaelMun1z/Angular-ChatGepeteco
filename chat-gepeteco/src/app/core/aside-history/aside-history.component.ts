import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileMenuComponent } from "../profile-menu/profile-menu.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { ConversationItemComponent } from "./conversation-item/conversation-item.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatSummaryDto } from '../../models/chat.model';
import { selectChatList, selectSidebarError, selectSidebarLoading } from '../../store/chat.selectors';
import { deleteChat, loadChatList, renameChat } from '../../store/chat.actions';

@Component({
    selector: 'app-aside-history',
    imports: [CommonModule, ProfileMenuComponent, RouterLink, ConversationItemComponent, RouterLinkActive],
    templateUrl: './aside-history.component.html',
    styleUrl: './aside-history.component.css'
})

export class AsideHistoryComponent implements OnInit {
    private store = inject(Store);
    public uiService = inject(UiService);
    
    chats$: Observable<ChatSummaryDto[]> = this.store.select(selectChatList);
    isLoading$: Observable<boolean> = this.store.select(selectSidebarLoading); 
    error$: Observable<any> = this.store.select(selectSidebarError);          
    
    ngOnInit() {
        this.loadChats();
    }
    
    loadChats() {
        this.store.dispatch(loadChatList());
    }
    
    // --- AÇÕES DO USUÁRIO ---
    
    onDeleteChat(chatId: string) {
        if (confirm('Tem certeza que deseja excluir esta conversa?')) {
            this.store.dispatch(deleteChat({ chatId }));
        }
    }
    
    onRenameChat(chatId: string, currentTitle: string) {
        const newTitle = prompt('Novo título da conversa:', currentTitle);
        if (newTitle && newTitle.trim() !== '' && newTitle !== currentTitle) {
            this.store.dispatch(renameChat({ chatId, title: newTitle }));
        }
    }
    
    // --- AUXILIARES ---
    
    getErrorDetails(error: any) {
        if (!error) return { message: '', icon: '' };
        if (error.status === 0 || error.status === 503) return { message: 'Servidor indisponível', icon: 'fa-solid fa-plug-circle-xmark' };
        if (error.status === 401 || error.status === 403) return { message: 'Sessão expirada', icon: 'fa-solid fa-user-lock' };
        return { message: 'Erro ao carregar', icon: 'fa-solid fa-triangle-exclamation' };
    }
    
    // Seus itens estáticos (Gems, MyItems) continuam aqui...
    toggleMenu() { 
        this.uiService.toggleSidebar();
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
}
