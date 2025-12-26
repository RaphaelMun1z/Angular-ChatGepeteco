import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsideHistoryComponent } from "../../core/aside-history/aside-history.component";
import { HeaderComponent } from "../../core/header/header.component";
import { InputContainerComponent } from "../../core/input-container/input-container.component";
import { ModalConfigComponent } from "../../core/modal-config/modal-config.component";

@Component({
    selector: 'app-chat-layout',
    imports: [CommonModule, FormsModule, AsideHistoryComponent, HeaderComponent, ModalConfigComponent, RouterOutlet],
    templateUrl: './chat-layout.component.html',
    styleUrl: './chat-layout.component.css'
})

export class ChatLayoutComponent {
}