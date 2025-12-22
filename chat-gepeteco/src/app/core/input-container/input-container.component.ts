import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
    @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;
    userInput = '';
    
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
        
        this.store.dispatch(
            sendMessage({ content: this.userInput })
        );
        
        this.userInput = '';
        if (this.chatInput) {
            this.chatInput.nativeElement.style.height = 'auto';
        }
    }
}
