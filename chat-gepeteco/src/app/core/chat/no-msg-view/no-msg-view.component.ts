import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-no-msg-view',
    imports: [CommonModule],
    templateUrl: './no-msg-view.component.html',
    styleUrl: './no-msg-view.component.css'
})

export class NoMsgViewComponent {
    fillInput(text: string) {
        alert("Completando input");
        // this.userInput = text;
        // setTimeout(() => {
        //     this.chatInput.nativeElement.focus();
        // });
    }
}
