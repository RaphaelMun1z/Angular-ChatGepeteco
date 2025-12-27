import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { concat, of, timer } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import * as ChatActions from './chat.actions';
import { ChatDetailsDto, ChatRequestDto, ChatResponseDto } from '../models/chat.model';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Injectable()
export class ChatEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private router = inject(Router);
    
    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ChatActions.sendMessage),
        mergeMap(({ payload }) => {
            const url = `http://localhost:8080/api/chat/${payload.chatId}/messages`;
            const body: ChatRequestDto = { content: payload.content };
            
            return this.http.post<ChatResponseDto>(url, body).pipe(
                map(responseDto => ChatActions.sendMessageSuccess({ response: responseDto })),
                catchError(error => of(ChatActions.sendMessageFailure({ error })))
            );
        })
    ));
    
    loadMessages$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ChatActions.loadMessages),
        mergeMap(({ chatId }) => {
            const url = `http://localhost:8080/api/chat/${chatId}`;
            
            return this.http.get<ChatDetailsDto>(url).pipe(
                map(data => ChatActions.loadMessagesSuccess({ chatData: data })),
                catchError(error => of(ChatActions.loadMessagesFailure({ error })))
            );
        })
    ));
    
    // ============================================
    
    loadChatList$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ChatActions.loadChatList),
        switchMap(() =>
            this.chatService.getUserChats().pipe(
            map((chats) => ChatActions.loadChatListSuccess({ chats })),
            catchError((error) => of(ChatActions.loadChatListFailure({ error })))
        )
    )));
    
    // ============================================
    
    createChatAndSend$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ChatActions.createChatAndSendMessage),
        switchMap(({ title, modelName, content }) => {
            
            return this.chatService.createChat({ title, modelName }).pipe(
                switchMap((newChat) => {
                    this.router.navigate(['/c', newChat.id]);
                    
                    return concat(
                        timer(100).pipe(
                            map(() => ChatActions.addOptimisticUserMessage({ content }))
                        ),
                        of(ChatActions.loadChatList()),
                        
                        this.chatService.sendMessage(newChat.id, content).pipe(
                            map((response) => ChatActions.sendMessageSuccess({ response })),
                            catchError((error) => of(ChatActions.sendMessageFailure({ error })))
                        )
                    );
                }),
                catchError((error) => of(ChatActions.sendMessageFailure({ error })))
            );
        })
    ));
    
    constructor(
        private chatService: ChatService
    ) {}
}