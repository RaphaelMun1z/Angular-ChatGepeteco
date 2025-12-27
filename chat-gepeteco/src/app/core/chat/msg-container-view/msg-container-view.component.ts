import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MsgModelBotComponent } from "../msg-model-bot/msg-model-bot.component";
import { MsgComponent } from "../msg/msg.component";
import { ChatMessage } from '../../../models/chat.model';

@Component({
    selector: 'app-msg-container-view',
    imports: [CommonModule, MsgModelBotComponent, MsgComponent],
    templateUrl: './msg-container-view.component.html',
    styleUrl: './msg-container-view.component.css'
})

export class MsgContainerViewComponent {
    @Input() message!: ChatMessage;
}
