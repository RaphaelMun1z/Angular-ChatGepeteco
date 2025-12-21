import { Component, Input } from '@angular/core';
import { Message } from '../../../models/chat.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-msg',
    imports: [CommonModule],
    templateUrl: './msg.component.html',
    styleUrl: './msg.component.css'
})
export class MsgComponent {
    @Input() message!: Message;
}
