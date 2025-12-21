import { Routes } from '@angular/router';
import { ChatLayoutComponent } from './pages/chat-layout/chat-layout.component';
import { ChatBoxComponent } from './core/chat-box/chat-box.component';
import { NoMsgViewComponent } from './core/chat/no-msg-view/no-msg-view.component';

export const routes: Routes = [
    {
        path: '',
        component: ChatLayoutComponent,
        children: [
            {
                path: '',
                component: NoMsgViewComponent, 
            },
            {
                path: 'c/:id',
                component: ChatBoxComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
