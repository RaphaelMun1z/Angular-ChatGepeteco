import { createAction, props } from '@ngrx/store';
import { Message } from '../models/chat.model';

export const sendMessage = createAction(
    '[Chat] Send Message',
    props<{ content: string }>()
);

export const sendMessageSuccess = createAction(
    '[Chat] Send Message Success',
    props<{ response: string }>()
);

export const sendMessageFailure = createAction(
    '[Chat] Send Message Failure',
    props<{ error: any }>()
);