import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { concat, of, timer } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';

import * as ChatActions from './chat.actions';
import { ChatService } from '../services/chat.service';

@Injectable()
export class ChatEffects {
    private actions$ = inject(Actions);
    private chatService = inject(ChatService);
    private router = inject(Router);

    // =================================================================
    // 1. MENSAGENS (Envio e Leitura)
    // =================================================================

    // Envia mensagem para um chat já existente
    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.sendMessage),
            mergeMap(({ payload }) =>
                this.chatService.sendMessage(payload.chatId, payload.content).pipe(
                    map(response => ChatActions.sendMessageSuccess({ response })),
                    catchError(error => of(ChatActions.sendMessageFailure({ error })))
                )
            )
        )
    );

    // Carrega o histórico de um chat ao abrir a página
    loadMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.loadMessages),
            mergeMap(({ chatId }) =>
                this.chatService.getChatById(chatId).pipe( 
                    map(data => ChatActions.loadMessagesSuccess({ chatData: data })),
                    catchError(error => of(ChatActions.loadMessagesFailure({ error })))
                )
            )
        )
    );

    // =================================================================
    // 2. SIDEBAR (Listagem)
    // =================================================================

    // Carrega a lista de conversas para a barra lateral
    loadChatList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.loadChatList),
            switchMap(() =>
                this.chatService.getUserChats().pipe(
                    map((chats) => ChatActions.loadChatListSuccess({ chats })),
                    catchError((error) => of(ChatActions.loadChatListFailure({ error })))
                )
            )
        )
    );

    // =================================================================
    // 3. FLUXO DE CRIAÇÃO OTIMISTA
    // =================================================================

    // Cria Chat -> Navega -> UI Otimista -> Envia Mensagem
    createChatAndSend$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.createChatAndSendMessage),
            switchMap(({ title, modelName, content }) => {
                
                return this.chatService.createChat({ title, modelName }).pipe(
                    switchMap((newChat) => {
                        // 1. Navegação imediata
                        this.router.navigate(['/c', newChat.id]);
                        
                        // 2. Sequência de ações
                        return concat(
                            // Delay técnico para garantir que a rota carregou
                            timer(100).pipe(
                                map(() => ChatActions.addOptimisticUserMessage({ content }))
                            ),
                            // Atualiza a sidebar com o novo chat
                            of(ChatActions.loadChatList()),
                            
                            // Envia a mensagem real para a IA
                            this.chatService.sendMessage(newChat.id, content).pipe(
                                map((response) => ChatActions.sendMessageSuccess({ response })),
                                catchError((error) => of(ChatActions.sendMessageFailure({ error })))
                            )
                        );
                    }),
                    catchError((error) => of(ChatActions.sendMessageFailure({ error })))
                );
            })
        )
    );

    // =================================================================
    // 4. GERENCIAMENTO (Delete/Rename)
    // =================================================================

    deleteChat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.deleteChat),
            mergeMap(({ chatId }) =>
                this.chatService.deleteChat(chatId).pipe(
                    map(() => {
                        // Se estiver na página do chat deletado, volta para home
                        if (this.router.url.includes(chatId)) {
                            this.router.navigate(['/']);
                        }
                        return ChatActions.deleteChatSuccess({ chatId });
                    }),
                    catchError((error) => of(ChatActions.deleteChatFailure({ error })))
                )
            )
        )
    );

    renameChat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.renameChat),
            mergeMap(({ chatId, title }) =>
                this.chatService.updateChatTitle(chatId, title).pipe(
                    map(() => ChatActions.renameChatSuccess({ chatId, title })),
                    catchError((error) => of(ChatActions.renameChatFailure({ error })))
                )
            )
        )
    );
}