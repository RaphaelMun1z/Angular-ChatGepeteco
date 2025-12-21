import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsLoading, selectMessages } from '../../store/chat.selectors';
import { NoMsgViewComponent } from "../chat/no-msg-view/no-msg-view.component";
import { MsgContainerViewComponent } from "../chat/msg-container-view/msg-container-view.component";
import { MsgLoadingComponent } from "../chat/msg-loading/msg-loading.component";

@Component({
    selector: 'app-chat-box',
    imports: [CommonModule, NoMsgViewComponent, MsgContainerViewComponent, MsgLoadingComponent],
    templateUrl: './chat-box.component.html',
    styleUrl: './chat-box.component.css'
})

export class ChatBoxComponent {
    private store = inject(Store);
    messages$ = this.store.select(selectMessages);
    isLoading$ = this.store.select(selectIsLoading);
    
    hasMessages$ = this.messages$.pipe(
        map(msgs => msgs.length > 0)
    );
}
