import { HttpErrorResponse } from '@angular/common/http';

export interface ChatRequestDto {
    content: string;
}

export interface ChatResponseDto {
    id: string;
    content: string;
    sender: string;
    createdAt: string;
}

export interface ChatDetailsDto {
    id: string;
    title: string;
    messages: ChatResponseDto[];
}

export interface SendMessagePayload {
    chatId: string;
    content: string;
}

export type ChatErrorPayload = HttpErrorResponse; 

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isError?: boolean;
    isHistory?: boolean;
}

export interface ChatState {
    messages: ChatMessage[];
    currentChatTitle: string | null;
    loading: boolean;
    error: ChatErrorPayload | null;
}