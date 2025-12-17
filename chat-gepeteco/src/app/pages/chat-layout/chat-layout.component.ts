import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { sendMessage } from '../../store/chat.actions';
import { selectMessages, selectIsLoading } from '../../store/chat.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AsideHistoryComponent } from "../../core/aside-history/aside-history.component";
import { HeaderComponent } from "../../core/header/header.component";
import { ChatBoxComponent } from "../../core/chat-box/chat-box.component";
import { InputContainerComponent } from "../../core/input-container/input-container.component";
import { ModalConfigComponent } from "../../core/modal-config/modal-config.component";

@Component({
    selector: 'app-chat-layout',
    imports: [CommonModule, FormsModule, AsideHistoryComponent, HeaderComponent, ChatBoxComponent, InputContainerComponent, ModalConfigComponent],
    templateUrl: './chat-layout.component.html',
    styleUrl: './chat-layout.component.css'
})

export class ChatLayoutComponent {
    isDarkMode = true; 
}