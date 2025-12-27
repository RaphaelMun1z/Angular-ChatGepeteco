import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputContainerComponent } from '../../input-container/input-container.component';

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
    selector: 'app-no-msg-view',
    imports: [CommonModule, InputContainerComponent],
    templateUrl: './no-msg-view.component.html',
    styleUrl: './no-msg-view.component.css'
})

export class NoMsgViewComponent {
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
}