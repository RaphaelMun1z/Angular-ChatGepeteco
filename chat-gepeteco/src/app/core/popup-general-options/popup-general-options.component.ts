import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-popup-general-options',
    imports: [CommonModule],
    templateUrl: './popup-general-options.component.html',
    styleUrl: './popup-general-options.component.css'
})

export class PopupGeneralOptionsComponent {
    print(msg: string) {
        alert(msg)
    }
}
