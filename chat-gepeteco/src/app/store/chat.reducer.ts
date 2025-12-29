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
    on(sendMessage, (state, { payload }) => ({
        ...state,
        activeChatLoading: true, 
        activeChatError: null,
        messages: [...state.messages, {
            id: `temp-${Date.now()}`,
            text: payload.content,
            sender: 'user' as const,
            timestamp: new Date()
        }]
    })),
    
    // Recebe resposta do Bot, remove loading do CHAT
    on(sendMessageSuccess, (state, { response }) => ({
        ...state,
        activeChatLoading: false,
        activeChatError: null,
        messages: [...state.messages, {
            id: response.id,
            text: response.content,
            sender: 'bot' as const,
            timestamp: new Date(response.createdAt),
            isHistory: false
        }]
    })),
    
    // Trata erro de envio (específico do chat)
    on(sendMessageFailure, (state, { error }) => {
        let errorText = 'Ocorreu um erro inesperado.';
        if (error.status === 401) errorText = 'Sessão expirada.';
        else if (error.status === 0) errorText = 'Sem conexão.';
        else if (error.error?.message) errorText = error.error.message;
        
        return {
            ...state,
            activeChatLoading: false,
            activeChatError: error, // Grava no erro do Chat
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
    on(loadMessages, (state) => ({
        ...state,
        activeChatLoading: true,
        activeChatError: null,
        currentChatTitle: null,
        messages: state.messages.filter((m: ChatMessage) => m.id === 'temp-id')
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
        
        const optimisticMessages = state.messages.filter((m: ChatMessage) => m.id === 'temp-id');
        const hasFreshBotResponse = state.messages.some((m: ChatMessage) => m.sender === 'bot' && !m.isHistory);
        
        // Lógica inteligente apenas para o loading do Chat
        const shouldKeepLoading = optimisticMessages.length > 0 && !hasFreshBotResponse;
        
        return {
            ...state,
            activeChatLoading: shouldKeepLoading,
            activeChatError: null,
            currentChatTitle: chatData.title,
            messages: [...history, ...optimisticMessages]
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