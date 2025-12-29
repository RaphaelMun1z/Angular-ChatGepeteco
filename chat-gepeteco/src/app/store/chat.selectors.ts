import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from '../models/chat.model';

// Seleciona o estado global da feature 'chat'
export const selectChatState = createFeatureSelector<ChatState>('chat');

// =================================================================
// 1. SELETORES DO CHAT ATIVO (Mensagens e Tela Principal)
// Usados no componente ChatBox
// =================================================================

export const selectMessages = createSelector(
    selectChatState,
    (state) => state.messages
);

export const selectActiveChatLoading = createSelector(
    selectChatState,
    (state) => state.activeChatLoading
);

export const selectActiveChatError = createSelector(
    selectChatState,
    (state) => state.activeChatError
);

export const selectCurrentChatTitle = createSelector(
    selectChatState,
    (state) => state.currentChatTitle
);

// =================================================================
// 2. SELETORES DA SIDEBAR (Lista de Conversas)
// Usados no componente AsideHistory
// =================================================================

export const selectChatList = createSelector(
    selectChatState,
    (state) => state.chatList
);

export const selectSidebarLoading = createSelector(
    selectChatState,
    (state) => state.sidebarLoading
);

export const selectSidebarError = createSelector(
    selectChatState,
    (state) => state.sidebarError
);