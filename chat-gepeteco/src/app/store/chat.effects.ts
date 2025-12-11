import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ChatActions from './chat.actions';

@Injectable()
export class ChatEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    
    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ChatActions.sendMessage),
        
        mergeMap((action) => {
            const params = new HttpParams().set('message', action.content);
            
            return this.http.post('http://localhost:8080/api/chat', {}, { 
                params: params,
                responseType: 'text'
            }).pipe(
                map(respostaTexto => {
                    return ChatActions.sendMessageSuccess({ response: respostaTexto });
                }),
                
                catchError(error => of(ChatActions.sendMessageFailure({ error })))
            );
        })
    )
);
}