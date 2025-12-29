import { HttpErrorResponse } from '@angular/common/http';

// =================================================================
// 1. API DTOs (Data Transfer Objects)
// Contratos exatos com o Backend
// =================================================================

/** Payload para criar uma nova sala de chat */
export interface CreateChatDto {
    title: string;
    modelName: string;
    systemInstruction?: string;
}

/** Payload para enviar uma mensagem de texto */
export interface MessageRequestDto {
    content: string;
}

/** Resposta da API representando uma mensagem única */
export interface MessageResponseDto {
    id: string;
    content: string;
    sender: string;
    createdAt: string;
}

/** Resposta da API ao carregar uma conversa completa */
export interface ChatHistoryDto {
    id: string;
    title: string;
    messages: MessageResponseDto[];
}

/** Item resumido para listagem na sidebar (Leve, sem mensagens) */
export interface ChatSummaryDto {
    id: string;
    title: string;
}

// =================================================================
// 2. UI MODELS (Frontend View Models)
// =================================================================

/** Modelo visual de mensagem pronto para o *ngFor */
export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot'; 
    timestamp: Date;        
    isError?: boolean;
    isHistory?: boolean;
    chatId?: string;
}

// =================================================================
// 3. NGRX STORE MODELS
// Estruturas internas do gerenciamento de estado
// =================================================================

/** Argumentos para a Action de enviar mensagem */
export interface SendMessagePayload {
    chatId: string;
    content: string;
}

/** Alias para facilitar a leitura de erros */
export type ApiError = HttpErrorResponse;

/** Estado Global do Chat */
export interface ChatState {
    messages: ChatMessage[];
    currentChatTitle: string | null;
    chatList: ChatSummaryDto[];
    sidebarLoading: boolean; 
    sidebarError: ApiError | null;
    activeChatLoading: boolean;
    activeChatError: ApiError | null;
}