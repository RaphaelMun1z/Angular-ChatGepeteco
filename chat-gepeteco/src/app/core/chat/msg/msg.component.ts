import { Component, Input } from '@angular/core';
import { Message } from '../../../models/chat.model';
import { CommonModule } from '@angular/common';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-msg',
    imports: [CommonModule],
    templateUrl: './msg.component.html',
    styleUrl: './msg.component.css'
})
export class MsgComponent {
    @Input() message!: Message;
    formattedContent: SafeHtml = '';
    
    constructor(private sanitizer: DomSanitizer) {}
    
    ngOnChanges() {
        if (this.message && this.message.text) {
            this.formattedContent = this.formatText(this.message.text);
        }
    }
    
    formatText(text: string): SafeHtml {
        let formatted = text;
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/^\s*\*\s+(.*)$/gm, '<div class="ml-4">• $1</div>');
        formatted = formatted.replace(/\n/g, '<br>');
        return this.sanitizer.bypassSecurityTrustHtml(formatted);
    }
}
