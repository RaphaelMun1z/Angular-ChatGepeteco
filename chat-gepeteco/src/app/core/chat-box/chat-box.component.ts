import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsLoading, selectMessages } from '../../store/chat.selectors';

@Component({
    selector: 'app-chat-box',
    imports: [CommonModule],
    templateUrl: './chat-box.component.html',
    styleUrl: './chat-box.component.css'
})

export class ChatBoxComponent {
    private store = inject(Store);
    
    userInput = '';
    messages$ = this.store.select(selectMessages);
    isLoading$ = this.store.select(selectIsLoading);
    
    @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;
    
    hasMessages$ = this.messages$.pipe(
        map(msgs => msgs.length > 0)
    );
    
    fillInput(text: string) {
        this.userInput = text;
        setTimeout(() => {
            this.chatInput.nativeElement.focus();
            this.autoResize();
        });
    }
    
    autoResize() {
        const el = this.chatInput.nativeElement;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
}
