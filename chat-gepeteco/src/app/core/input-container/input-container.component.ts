import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendMessage } from '../../store/chat.actions';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-container',
    imports: [CommonModule, FormsModule],
    templateUrl: './input-container.component.html',
    styleUrl: './input-container.component.css'
})

export class InputContainerComponent {
    private store = inject(Store);
    chatInput: any;
    userInput: string = '';
    
    autoResize() {
        const el = this.chatInput.nativeElement;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
    
    handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.send();
        }
    }
    
    send() {
        if (!this.userInput.trim()) return;
        
        // Dispara a ação do NgRx
        this.store.dispatch(
            sendMessage({ content: this.userInput })
        );
        
        // Limpa UI
        this.userInput = '';
        this.chatInput.nativeElement.style.height = 'auto';
    }
}
