import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { sendMessage } from '../../store/chat.actions';
import { selectMessages, selectIsLoading } from '../../store/chat.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
    selector: 'app-chat-layout',
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-layout.component.html',
    styleUrl: './chat-layout.component.css'
})

export class ChatLayoutComponent {
    private store = inject(Store);
    
    // Seletores do NgRx
    messages$ = this.store.select(selectMessages);
    isLoading$ = this.store.select(selectIsLoading);
    
    // Verifica se tem mensagens para mostrar a tela de "Boas vindas" ou o Chat
    hasMessages$ = this.messages$.pipe(map(msgs => msgs.length > 0));
    
    // Variáveis de Estado da UI (Local State)
    userInput = '';
    isSidebarOpen = false;
    isSettingsOpen = false;
    isDarkMode = true; // Começando como Dark por padrão
    
    // Referência para o textarea (para auto-resize)
    @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;
    
    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
    
    toggleSettings() {
        this.isSettingsOpen = !this.isSettingsOpen;
    }
    
    setTheme(theme: 'light' | 'dark') {
        this.isDarkMode = theme === 'dark';
    }
    
    // Função chamada ao digitar para ajustar altura
    autoResize() {
        const el = this.chatInput.nativeElement;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
    
    // Preencher input ao clicar nas sugestões
    fillInput(text: string) {
        this.userInput = text;
        setTimeout(() => {
            this.chatInput.nativeElement.focus();
            this.autoResize();
        });
    }
    
    send() {
        if (!this.userInput.trim()) return;
        
        // Dispara a ação do NgRx
        this.store.dispatch(sendMessage({ content: this.userInput }));
        
        // Limpa UI
        this.userInput = '';
        this.chatInput.nativeElement.style.height = 'auto';
    }
    
    // Tratamento de Enter no textarea
    handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.send();
        }
    }
}