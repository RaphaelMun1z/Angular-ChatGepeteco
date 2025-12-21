import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-conversation-item',
    imports: [CommonModule, RouterLink],
    templateUrl: './conversation-item.component.html',
    styleUrl: './conversation-item.component.css'
})

export class ConversationItemComponent {
    @Input() title: string = '';
    @Input() route: string = '';
    @Input() isActive: boolean = false;
    @Input() isPinned: boolean = false;
    @Input() isCollapsed: boolean = false;
}
