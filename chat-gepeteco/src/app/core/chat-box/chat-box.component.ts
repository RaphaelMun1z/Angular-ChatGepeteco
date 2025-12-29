import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectActiveChatError, selectActiveChatLoading, selectMessages } from '../../store/chat.selectors';
import { MsgContainerViewComponent } from "../chat/msg-container-view/msg-container-view.component";
import { MsgLoadingComponent } from "../chat/msg-loading/msg-loading.component";
import { InputContainerComponent } from '../input-container/input-container.component';
import { ActivatedRoute } from '@angular/router';
import { clearChatState, loadMessages } from '../../store/chat.actions';
import { ChatMessage } from '../../models/chat.model';

@Component({
    selector: 'app-chat-box',
    imports: [CommonModule, MsgContainerViewComponent, MsgLoadingComponent, InputContainerComponent],
    templateUrl: './chat-box.component.html',
    styleUrl: './chat-box.component.css'
})

export class ChatBoxComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
    private mutationObserver: MutationObserver | null = null;
    
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    
    // Seletores específicos do Chat Ativo
    messages$: Observable<ChatMessage[]> = this.store.select(selectMessages);
    isLoading$: Observable<boolean> = this.store.select(selectActiveChatLoading);
    error$: Observable<any> = this.store.select(selectActiveChatError);      
    
    chatId: string = '';
    
    hasMessages$ = this.messages$.pipe(map(msgs => msgs.length > 0));
    
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const newId = params.get('id');
            if (newId) {
                this.chatId = newId;
                this.store.dispatch(loadMessages({ chatId: this.chatId }));
            }
        });
    }
    
    ngOnDestroy() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        
        this.store.dispatch(clearChatState());
    }
    
    // Lógica de Scroll e Observer
    ngAfterViewInit() {
        this.initAutoScroll();
    }
    
    private initAutoScroll() {
        const container = this.scrollContainer.nativeElement;
        
        this.mutationObserver = new MutationObserver(() => {
            this.scrollToBottom();
        });
        
        this.mutationObserver.observe(container, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
    
    private scrollToBottom(): void {
        try {
            const container = this.scrollContainer.nativeElement;
            container.scrollTop = container.scrollHeight;
        } catch (err) {}
    }
    
    getErrorMessage(error: any): string {
        if (!error) return '';
        
        if (error.error?.message && Array.isArray(error.error.message)) {
            return error.error.message[0];
        }
        
        if (error.error?.message) return error.error.message;
        
        if (error.status === 401) return 'Você precisa estar logado.';
        if (error.status === 403) return 'Acesso negado.';
        if (error.status === 404) return 'Chat não encontrado.';
        
        return 'Ocorreu um erro desconhecido.';
    }
}
