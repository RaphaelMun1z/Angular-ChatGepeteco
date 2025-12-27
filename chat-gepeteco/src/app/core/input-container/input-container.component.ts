import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { sendMessage } from '../../store/chat.actions';
import { Store } from '@ngrx/store';
import { SendMessagePayload } from '../../models/chat.model';

interface QuickOption {
    text: string;
    icon?: string;
}

interface ModelOption {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor: string;
}

@Component({
    selector: 'app-input-container',
    imports: [CommonModule, FormsModule],
    templateUrl: './input-container.component.html',
    styleUrl: './input-container.component.css'
})

export class InputContainerComponent {
    private store = inject(Store);
    
    @ViewChild('chatInput') chatInput!: ElementRef;
    
    @Input() chatId: string = '1';
    
    userInput: string = '';
    isModelPopupOpen: boolean = false;
    isPlusPopupOpen: boolean = false;
    
    availableModels: ModelOption[] = [
        { 
            id: 'pro', 
            name: 'Gemini 1.5 Pro', 
            description: 'Raciocínio complexo', 
            icon: 'fa-bolt', 
            iconColor: 'text-[#a8c7fa]' 
        },
        { 
            id: 'flash', 
            name: 'Gemini 1.5 Flash', 
            description: 'Rápido e leve', 
            icon: 'fa-rocket', 
            iconColor: 'text-[#e3e3e3]' 
        }
    ];
    
    selectedModel: ModelOption = this.availableModels[0];
    
    quickOptions: QuickOption[] = [
        { text: 'Ler documento', icon: '📄' },
        { text: 'Escrever algo' },
        { text: 'Me ajude a aprender' }
    ];
    
    toggleModelPopup(): void {
        this.isModelPopupOpen = !this.isModelPopupOpen;
        if (this.isModelPopupOpen) this.isPlusPopupOpen = false;
    }
    
    togglePlusPopup(): void {
        this.isPlusPopupOpen = !this.isPlusPopupOpen;
        if (this.isPlusPopupOpen) this.isModelPopupOpen = false;
    }
    
    selectModel(model: ModelOption): void {
        this.selectedModel = model;
        this.isModelPopupOpen = false;
    }
    
    handleFileUpload(event: any): void {
        const file = event.target.files[0];
        if (file) {
            console.log('Arquivo PDF selecionado:', file.name);
            this.isPlusPopupOpen = false;
        }
    }
    
    handleEnter(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.send();
        }
    }
    
    send(): void {
        if (!this.userInput.trim()) return;
        
        const payload: SendMessagePayload = {
            chatId: this.chatId,
            content: this.userInput.trim()
        };
        
        this.store.dispatch(sendMessage({ payload }));
        this.userInput = '';
        this.isModelPopupOpen = false;
        this.isPlusPopupOpen = false;
    }
}
