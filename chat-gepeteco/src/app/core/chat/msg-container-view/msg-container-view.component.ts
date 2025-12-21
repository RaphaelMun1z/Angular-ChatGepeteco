import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MsgModelBotComponent } from "../msg-model-bot/msg-model-bot.component";
import { MsgModelUserComponent } from "../msg-model-user/msg-model-user.component";
import { MsgComponent } from "../msg/msg.component";
import { Message } from '../../../models/chat.model';

@Component({
    selector: 'app-msg-container-view',
    imports: [CommonModule, MsgModelBotComponent, MsgModelUserComponent, MsgComponent],
    templateUrl: './msg-container-view.component.html',
    styleUrl: './msg-container-view.component.css'
})

export class MsgContainerViewComponent {
    @Input() message!: Message;
}
