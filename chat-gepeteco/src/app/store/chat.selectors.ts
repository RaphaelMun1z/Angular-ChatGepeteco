import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from '../models/chat.model';

export const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectMessages = createSelector(
    selectChatState,
    (state) => state.messages
);

export const selectIsLoading = createSelector(
    selectChatState,
    (state) => state.loading
);