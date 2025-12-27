import { createReducer, on } from '@ngrx/store';
import { sendMessage, sendMessageSuccess, sendMessageFailure, loadMessages, loadMessagesSuccess, loadMessagesFailure, loadChatList, loadChatListSuccess, loadChatListFailure, addOptimisticUserMessage } from './chat.actions';
import { ChatMessage, ChatState } from '../models/chat.model';

export const initialState: ChatState = {
    messages: [],
    currentChatTitle: null,
    chatList: [],
    loading: false,
    error: null
};

export const chatReducer = createReducer(
    initialState,
    on(sendMessage, (state, { payload }) => {
        const tempMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            text: payload.content,
            sender: 'user',
            timestamp: new Date()
        };
        
        return {
            ...state,
            loading: true,
            error: null,
            messages: [...state.messages, tempMessage]
        };
    }),
    
    on(sendMessageSuccess, (state, { response }) => {
        const botMessage: ChatMessage = {
            id: response.id,
            text: response.content,
            sender: 'bot',
            timestamp: new Date(response.createdAt),
            isHistory: false
        };
        return { 
            ...state, 
            loading: false, 
            error: null,
            messages: [...state.messages, botMessage]
        };
    }),
    
    on(sendMessageFailure, (state, { error }) => {
        let errorText = 'Ocorreu um erro inesperado.';
        
        if (error.error) {
            
            if (error.error.message && Array.isArray(error.error.message) && error.error.message.length > 0) {
                errorText = error.error.message[0]; 
            } else if (typeof error.error.message === 'string') {
                errorText = error.error.message;
            } else if (error.error.error && typeof error.error.error === 'string') {
                errorText = error.error.error;
            }
        }
        
        else if (error.status === 401) {
            errorText = 'Sessão expirada ou login necessário.';
        } else if (error.status === 403) {
            errorText = 'Você não tem permissão para acessar este recurso.';
        } else if (error.status === 0) {
            errorText = 'Sem conexão com o servidor.';
        }
        
        const errorMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            text: `❌ ${errorText}`,
            sender: 'bot',
            isError: true,
            timestamp: new Date()
        };
        
        return {
            ...state,
            loading: false,
            error: error,
            messages: [...state.messages, errorMessage]
        };
    }),
    
    on(loadMessages, (state) => ({
        ...state,
        loading: true,
        error: null,
        currentChatTitle: null,
        messages: state.messages.filter(m => m.id === 'temp-id')
    })),
    
    on(loadMessagesSuccess, (state, { chatData }) => {
        const history: ChatMessage[] = chatData.messages.map(msg => {
            const senderType = (msg.sender === 'USER') ? 'user' : 'bot';
            return {
                id: msg.id,
                text: msg.content,
                sender: senderType,
                timestamp: new Date(msg.createdAt),
                isHistory: true
            };
        });
        
        const optimisticMessages = state.messages.filter(m => m.id === 'temp-id');
        const hasFreshBotResponse = state.messages.some(m => m.sender === 'bot' && !m.isHistory);
        const shouldKeepLoading = optimisticMessages.length > 0 && !hasFreshBotResponse;
        
        return {
            ...state,
            loading: shouldKeepLoading, 
            error: null,
            currentChatTitle: chatData.title,
            messages: [...history, ...optimisticMessages]
        };
    }),
    
    on(loadMessagesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
    
    // ============================================
    
    on(loadChatList, (state) => ({
        ...state,
        loading: state.loading
    })),
    
    on(loadChatListSuccess, (state, { chats }) => {
        const hasPendingMessage = state.messages.some(m => m.id === 'temp-id');
        
        return {
            ...state,
            loading: hasPendingMessage ? true : false, 
            chatList: chats
        };
    }),
    
    on(loadChatListFailure, (state, { error }) => {
        const hasPendingMessage = state.messages.some(m => m.id === 'temp-id');
        
        return {
            ...state,
            loading: hasPendingMessage ? true : false,
            error
        };
    }),
    
    on(addOptimisticUserMessage, (state, { content }) => ({
        ...state,
        messages: [
            ...state.messages,
            {
                id: 'temp-id',
                text: content,
                sender: 'user' as const,
                timestamp: new Date(),
                isHistory: false
            }
        ],
        loading: true
    })),
);