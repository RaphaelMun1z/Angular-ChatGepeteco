import { Component, Input, SimpleChanges } from '@angular/core';
import { ChatMessage } from '../../../models/chat.model';
import { CommonModule } from '@angular/common';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-msg',
    imports: [CommonModule],
    templateUrl: './msg.component.html',
    styleUrl: './msg.component.css'
})

export class MsgComponent {
    @Input() message!: ChatMessage;
    displayedContent: SafeHtml = '';
    
    private fullHtmlString: string = '';
    private typingTimer: any;
    
    constructor(private sanitizer: DomSanitizer) {}
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes['message'] && this.message && this.message.text) {
            this.fullHtmlString = this.formatRawText(this.message.text);
            
            if (this.message.sender !== 'user' && !this.message.isError && !this.message.isHistory) {
                this.typewriterEffect(this.fullHtmlString);
            } else {
                this.displayedContent = this.sanitizer.bypassSecurityTrustHtml(this.fullHtmlString);
            }
        }
    }
    
    private formatRawText(text: string): string {
        if (!text) return '';
        let formatted = text;
        
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/^\s*\*\s+(.*)$/gm, '<div class="ml-4 flex items-start"><span class="mr-2">•</span><span>$1</span></div>');
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    private typewriterEffect(htmlString: string) {
        let currentIndex = 0;
        let currentString = '';
        
        if (this.typingTimer) clearInterval(this.typingTimer);
        
        const speed = 15; 
        
        const type = () => {
            if (currentIndex >= htmlString.length) {
                return;
            }
            
            if (htmlString[currentIndex] === '<') {
                const closingIndex = htmlString.indexOf('>', currentIndex);
                
                if (closingIndex !== -1) {
                    currentString += htmlString.substring(currentIndex, closingIndex + 1);
                    currentIndex = closingIndex + 1;
                } else {
                    currentString += htmlString[currentIndex];
                    currentIndex++;
                }
            } else {
                currentString += htmlString[currentIndex];
                currentIndex++;
            }
            
            this.displayedContent = this.sanitizer.bypassSecurityTrustHtml(currentString);
            this.typingTimer = setTimeout(type, speed);
        };
        
        type();
    }
    
    ngOnDestroy() {
        if (this.typingTimer) clearTimeout(this.typingTimer);
    }
}
