import { createAction, props } from '@ngrx/store';
import { SendMessagePayload, ChatResponseDto, ChatErrorPayload, ChatDetailsDto, ChatListItem } from '../models/chat.model';

export const sendMessage = createAction(
    '[Chat] Send Message',
    props<{ payload: SendMessagePayload }>()
);

export const sendMessageSuccess = createAction(
    '[Chat] Send Message Success',
    props<{ response: ChatResponseDto }>()
);

export const sendMessageFailure = createAction(
    '[Chat] Send Message Failure',
    props<{ error: ChatErrorPayload }>()
);

export const loadMessages = createAction(
    '[Chat] Load Messages',
    props<{ chatId: string }>()
);

export const loadMessagesSuccess = createAction(
    '[Chat] Load Messages Success',
    props<{ chatData: ChatDetailsDto }>()
);

export const loadMessagesFailure = createAction(
    '[Chat] Load Messages Failure',
    props<{ error: ChatErrorPayload }>()
);

// ============================================

export const loadChatList = createAction(
    '[Sidebar] Load Chat List'
);

export const loadChatListSuccess = createAction(
    '[Sidebar] Load Chat List Success',
    props<{ chats: ChatListItem[] }>()
);

export const loadChatListFailure = createAction(
    '[Sidebar] Load Chat List Failure',
    props<{ error: any }>()
);

// ============================================

export const createChatAndSendMessage = createAction(
    '[Chat] Create and Send Message',
    props<{ 
        title: string, 
        modelName: string, 
        content: string 
    }>()
);

export const addOptimisticUserMessage = createAction(
    '[Chat] Add Optimistic User Message',
    props<{ content: string }>()
);