import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ChatActions from './chat.actions';
import { ChatDetailsDto, ChatRequestDto, ChatResponseDto } from '../models/chat.model';

@Injectable()
export class ChatEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    
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
}