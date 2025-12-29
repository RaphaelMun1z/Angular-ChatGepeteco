import { createReducer, on } from '@ngrx/store';
import { 
    sendMessage, sendMessageSuccess, sendMessageFailure, 
    loadMessages, loadMessagesSuccess, loadMessagesFailure, 
    loadChatList, loadChatListSuccess, loadChatListFailure, 
    addOptimisticUserMessage, 
    deleteChat, deleteChatFailure, deleteChatSuccess, 
    renameChat, renameChatFailure, renameChatSuccess, 
    clearChatState
} from './chat.actions';
import { ChatMessage, ChatState, MessageResponseDto } from '../models/chat.model';

// Definindo o Estado Inicial com a separação de erros e loading
export const initialState: ChatState = {
    messages: [],
    currentChatTitle: null,
    chatList: [],
    currentChatId: null,
    optimisticQueue: [],
    pendingChatIds: [],
    
    // Contexto: Sidebar
    sidebarLoading: false,
    sidebarError: null,
    
    // Contexto: Chat Ativo
    activeChatLoading: false,
    activeChatError: null
};

export const chatReducer = createReducer(
    initialState,
    
    // =================================================================
    // 1. CONTEXTO: CHAT ATIVO (Mensagens & Envio)
    // Afeta: activeChatLoading, activeChatError, messages
    // =================================================================
    
    // Adiciona msg temporária do usuário e ativa loading do CHAT
    on(sendMessage, (state, { payload }) => {
        const tempMsg: ChatMessage = {
            id: `temp-${Date.now()}`,
            text: payload.content,
            sender: 'user' as const,
            timestamp: new Date(),
            chatId: payload.chatId
        };
        
        return {
            ...state,
            activeChatLoading: true,
            activeChatError: null,
            pendingChatIds: [...new Set([...state.pendingChatIds, payload.chatId])],
            optimisticQueue: [...state.optimisticQueue, tempMsg],
            messages: [...state.messages, tempMsg]
        };
    }),
    
    // Recebe resposta do Bot, remove loading do CHAT
    on(sendMessageSuccess, (state, { response, chatId }) => {
        const updatedPendingIds = state.pendingChatIds.filter(id => id !== chatId);
        const updatedQueue = state.optimisticQueue.filter(m => m.chatId !== chatId);
        
        if (state.currentChatId !== chatId) {
            return {
                ...state,
                pendingChatIds: updatedPendingIds,
                optimisticQueue: updatedQueue
            };
        }
        
        return {
            ...state,
            activeChatLoading: false,
            activeChatError: null,
            pendingChatIds: updatedPendingIds,
            optimisticQueue: updatedQueue,
            messages: [...state.messages, {
                id: response.id,
                text: response.content,
                sender: 'bot' as const,
                timestamp: new Date(response.createdAt),
                isHistory: false
            }]
        };
    }),
    
    // Trata erro de envio (específico do chat)
    on(sendMessageFailure, (state, { error }) => {
        let errorText = 'Ocorreu um erro inesperado.';
        if (error.status === 401) errorText = 'Sessão expirada.';
        else if (error.status === 0) errorText = 'Sem conexão.';
        else if (error.error?.message) errorText = error.error.message;
        
        return {
            ...state,
            activeChatLoading: false,
            activeChatError: error,
            pendingChatIds: state.currentChatId 
            ? state.pendingChatIds.filter(id => id !== state.currentChatId) 
            : state.pendingChatIds,
            optimisticQueue: state.currentChatId 
            ? state.optimisticQueue.filter(m => m.chatId !== state.currentChatId)
            : state.optimisticQueue,
            messages: [...state.messages, {
                id: `err-${Date.now()}`,
                text: `❌ ${errorText}`,
                sender: 'bot' as const,
                isError: true,
                timestamp: new Date()
            }]
        };
    }),
    
    // Limpa mensagens antigas, mantém otimista, liga loading do CHAT
    on(loadMessages, (state, { chatId }) => ({
        ...state,
        activeChatLoading: true,
        activeChatError: null,
        currentChatTitle: null,
        currentChatId: chatId,
        messages: []
    })),
    
    // Carrega histórico
    on(loadMessagesSuccess, (state, { chatData }) => {
        const history = chatData.messages.map((msg: MessageResponseDto) => ({
            id: msg.id,
            text: msg.content,
            sender: (msg.sender === 'USER') ? 'user' as const : 'bot' as const,
            timestamp: new Date(msg.createdAt),
            isHistory: true
        } as ChatMessage));
        
        const pendingForThisChat = state.optimisticQueue.filter(
            m => m.chatId === chatData.id
        );
        
        const isBackendProcessing = state.pendingChatIds.includes(chatData.id);
        const shouldKeepLoading = pendingForThisChat.length > 0 || isBackendProcessing;
        
        return {
            ...state,
            activeChatLoading: shouldKeepLoading,
            activeChatError: null,
            currentChatTitle: chatData.title,
            currentChatId: chatData.id,
            messages: [...history, ...pendingForThisChat]
        };
    }),
    
    on(loadMessagesFailure, (state, { error }) => ({
        ...state,
        activeChatLoading: false,
        activeChatError: error
    })),
    
    // Adiciona msg fake (UI Otimista)
    on(addOptimisticUserMessage, (state, { content }) => ({
        ...state,
        activeChatLoading: true, // Liga loading do chat
        messages: [...state.messages, {
            id: 'temp-id',
            text: content,
            sender: 'user' as const,
            timestamp: new Date(),
            isHistory: false
        }]
    })),
    
    // =================================================================
    // 2. CONTEXTO: SIDEBAR (Lista, Delete, Rename)
    // Afeta: sidebarLoading, sidebarError, chatList
    // =================================================================
    
    // Inicia carga da lista
    on(loadChatList, (state) => ({
        ...state,
        sidebarLoading: true, // Liga loading da Sidebar
        sidebarError: null
    })),
    
    // Sucesso da lista
    on(loadChatListSuccess, (state, { chats }) => ({
        ...state,
        sidebarLoading: false, // Desliga, pois não depende mais do chat
        chatList: chats
    })),
    
    on(loadChatListFailure, (state, { error }) => ({
        ...state,
        sidebarLoading: false,
        sidebarError: error
    })),
    
    // --- DELETE ---
    on(deleteChat, (state) => ({ 
        ...state, 
        sidebarLoading: true 
    })),
    
    on(clearChatState, (state) => ({
        ...state,
        messages: [],
        currentChatTitle: null,
        currentChatId: null,
        activeChatLoading: false,
        activeChatError: null
    })),
    
    on(deleteChatSuccess, (state, { chatId }) => ({
        ...state,
        sidebarLoading: false,
        chatList: state.chatList.filter(chat => chat.id !== chatId),
        messages: [], 
        currentChatTitle: null
    })),
    
    on(deleteChatFailure, (state, { error }) => ({ 
        ...state, 
        sidebarLoading: false, 
        sidebarError: error 
    })),
    
    // --- RENAME ---
    on(renameChat, (state) => ({ 
        ...state, 
        sidebarLoading: true 
    })),
    
    on(renameChatSuccess, (state, { chatId, title }) => ({
        ...state,
        sidebarLoading: false,
        chatList: state.chatList.map(chat => 
            chat.id === chatId ? { ...chat, title } : chat
        ),
        currentChatTitle: state.currentChatTitle // Opcional: atualiza titulo se for o atual
    })),
    
    on(renameChatFailure, (state, { error }) => ({ 
        ...state, 
        sidebarLoading: false, 
        sidebarError: error 
    })),
);