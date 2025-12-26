import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-msg-model-bot',
    imports: [CommonModule],
    templateUrl: './msg-model-bot.component.html',
    styleUrl: './msg-model-bot.component.css'
})

export class MsgModelBotComponent {
    @Input() isLoading: boolean = false;
}
