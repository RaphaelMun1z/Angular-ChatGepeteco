import { createAction, props } from '@ngrx/store';
import { SendMessagePayload, MessageResponseDto, ApiError,  ChatHistoryDto, ChatSummaryDto      } from '../models/chat.model';

// =================================================================
// 1. MENSAGENS (Envio e Histórico)
// =================================================================

// Envia uma nova mensagem para um chat existente
export const sendMessage = createAction(
    '[Chat] Send Message',
    props<{ payload: SendMessagePayload }>()
);

export const sendMessageSuccess = createAction(
    '[Chat] Send Message Success',
    props<{ response: MessageResponseDto, chatId: string }>()
);

export const sendMessageFailure = createAction(
    '[Chat] Send Message Failure',
    props<{ error: ApiError }>()
);

// Carrega o histórico de mensagens de um chat específico
export const loadMessages = createAction(
    '[Chat] Load Messages',
    props<{ chatId: string }>()
);

export const loadMessagesSuccess = createAction(
    '[Chat] Load Messages Success',
    props<{ chatData: ChatHistoryDto }>()
);

export const loadMessagesFailure = createAction(
    '[Chat] Load Messages Failure',
    props<{ error: ApiError }>()
);

// =================================================================
// 2. FLUXOS ESPECIAIS (UX e Criação)
// =================================================================

// Cria um novo chat e envia a primeira mensagem (Fluxo da Home)
export const createChatAndSendMessage = createAction(
    '[Chat] Create and Send Message',
    props<{ 
        title: string, 
        modelName: string, 
        content: string 
    }>()
);

// Adiciona a mensagem na tela imediatamente (antes do backend responder)
export const addOptimisticUserMessage = createAction(
    '[Chat] Add Optimistic User Message',
    props<{ content: string }>()
);

// =================================================================
// 3. SIDEBAR (Listagem)
// =================================================================

// Busca a lista de conversas do usuário para a barra lateral
export const loadChatList = createAction(
    '[Sidebar] Load Chat List'
);

export const loadChatListSuccess = createAction(
    '[Sidebar] Load Chat List Success',
    props<{ chats: ChatSummaryDto[] }>()
);

export const loadChatListFailure = createAction(
    '[Sidebar] Load Chat List Failure',
    props<{ error: any }>()
);

// =================================================================
// 4. GERENCIAMENTO DE CHAT (CRUD)
// =================================================================

// Deletar Conversa
export const deleteChat = createAction(
    '[Sidebar] Delete Chat',
    props<{ chatId: string }>()
);

export const deleteChatSuccess = createAction(
    '[Sidebar] Delete Chat Success',
    props<{ chatId: string }>()
);

export const deleteChatFailure = createAction(
    '[Sidebar] Delete Chat Failure',
    props<{ error: any }>()
);

// Renomear Conversa
export const renameChat = createAction(
    '[Sidebar] Rename Chat',
    props<{ chatId: string; title: string }>()
);

export const renameChatSuccess = createAction(
    '[Sidebar] Rename Chat Success',
    props<{ chatId: string; title: string }>()
);

export const renameChatFailure = createAction(
    '[Sidebar] Rename Chat Failure',
    props<{ error: any }>()
);

export const clearChatState = createAction(
    '[Chat] Clear Active State'
);