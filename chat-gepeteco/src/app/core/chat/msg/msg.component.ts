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
        
        const codeBlocks: string[] = [];
        let blockIndex = 0;
        
        /* ===========================
        1. EXTRAI ```code``` → PLACEHOLDER
        ============================ */
        let formatted = text.replace(
            /```([\w-]+)?\n([\s\S]*?)```/g,
            (_match, lang, code) => {
                const safeCode = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
                
                const block = `
<pre class="my-3 overflow-auto rounded-xl bg-[#0f0f10] p-4 text-sm text-[#e3e3e3]">
<code class="language-${lang || 'plaintext'}">${safeCode}</code>
</pre>`;
                
                codeBlocks.push(block);
                return `%%CODE_BLOCK_${blockIndex++}%%`;
            }
        );
        
        /* ===========================
        2. ESCAPE HTML (SÓ TEXTO)
        ============================ */
        formatted = formatted
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
        
        /* ===========================
        3. MARKDOWN INLINE
        ============================ */
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/~~(.*?)~~/g, '<del>$1</del>');
        formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1 rounded bg-black/10 text-sm">$1</code>');
        
        /* ===========================
        4. HEADERS
        ============================ */
        formatted = formatted.replace(/^### (.*)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
        formatted = formatted.replace(/^## (.*)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>');
        formatted = formatted.replace(/^# (.*)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
        
        /* ===========================
        5. LISTAS
        ============================ */
        formatted = formatted.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul class="ml-6 list-disc my-2">$1</ul>');
        
        formatted = formatted.replace(/^\s*\d+\.\s+(.*)$/gm, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ol class="ml-6 list-decimal my-2">$1</ol>');
        
        /* ===========================
        6. LINKS
        ============================ */
        formatted = formatted.replace(
            /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener" class="text-blue-500 underline">$1</a>'
        );
        
        /* ===========================
        7. PARÁGRAFOS / QUEBRAS
        ============================ */
        formatted = formatted.replace(/\n{2,}/g, '</p><p class="my-2">');
        formatted = `<p class="my-2">${formatted}</p>`;
        formatted = formatted.replace(/\n/g, '<br>');
        
        /* ===========================
        8. RESTAURA BLOCOS DE CÓDIGO
        ============================ */
        codeBlocks.forEach((block, i) => {
            formatted = formatted.replace(`%%CODE_BLOCK_${i}%%`, block);
        });
        
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
