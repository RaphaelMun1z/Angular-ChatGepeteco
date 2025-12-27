import { createAction, props } from '@ngrx/store';
import { SendMessagePayload, ChatResponseDto, ChatErrorPayload, ChatDetailsDto } from '../models/chat.model';

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