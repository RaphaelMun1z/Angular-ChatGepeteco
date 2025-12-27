import { Component } from '@angular/core';
import { MsgModelBotComponent } from "../msg-model-bot/msg-model-bot.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-msg-loading',
    imports: [CommonModule, MsgModelBotComponent],
    templateUrl: './msg-loading.component.html',
    styleUrl: './msg-loading.component.css'
})

export class MsgLoadingComponent {
    loadingPhrases: string[] = [
        'Pensando...',
        'Analisando sua pergunta...',
        'Consultando conhecimentos...',
        'Gerando resposta...',
        'Formatando o texto...',
        'Quase lá...'
    ];
    
    currentPhrase: string = this.loadingPhrases[0];
    private intervalId: any;
    
    ngOnInit(): void {
        let index = 0;
        this.intervalId = setInterval(() => {
            index = (index + 1) % this.loadingPhrases.length;
            this.currentPhrase = this.loadingPhrases[index];
        }, 2000);
    }
    
    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
