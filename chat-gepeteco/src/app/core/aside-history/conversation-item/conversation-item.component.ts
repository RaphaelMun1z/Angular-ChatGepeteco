import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-conversation-item',
    imports: [CommonModule],
    templateUrl: './conversation-item.component.html',
    styleUrl: './conversation-item.component.css'
})

export class ConversationItemComponent {
    private router = inject(Router);
    
    @Input() title: string = '';
    @Input() route: string = '';
    @Input() isActive: boolean = false;
    @Input() isPinned: boolean = false;
    @Input() isCollapsed: boolean = false;
    
    @Output() deleteRequest = new EventEmitter<void>();
    @Output() renameRequest = new EventEmitter<void>();
    
    isMenuOpen: boolean = false;
    
    navigate() {
        this.router.navigateByUrl(this.route);
    }
    
    toggleMenu(event: Event) {
        event.stopPropagation();
        this.isMenuOpen = !this.isMenuOpen;
    }
    
    closeMenu(event: Event) {
        event.stopPropagation();
        this.isMenuOpen = false;
    }
    
    onRename(event: Event) {
        event.stopPropagation();
        this.isMenuOpen = false;
        this.renameRequest.emit();
    }
    
    onDelete(event: Event) {
        event.stopPropagation();
        this.isMenuOpen = false;
        this.deleteRequest.emit();
    }
}
