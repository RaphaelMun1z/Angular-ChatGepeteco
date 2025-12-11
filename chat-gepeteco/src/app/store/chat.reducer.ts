import { createReducer, on } from '@ngrx/store';
import { sendMessage, sendMessageSuccess, sendMessageFailure } from './chat.actions';
import { ChatState } from '../models/chat.model';

export const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null
};

export const chatReducer = createReducer(
    initialState,
    
    on(sendMessage, (state, { content }) => ({
        ...state,
        loading: true,
        error: null,
        messages: [
            ...state.messages, 
            { 
                id: Date.now().toString(),
                text: content, 
                sender: 'user' as const, 
                timestamp: new Date() }
            ]
        })),
        
        on(sendMessageSuccess, (state, { response }) => ({
            ...state,
            loading: false,
            messages: [
                ...state.messages,
                { 
                    id: Date.now().toString(),
                    text: response, sender: 'bot' as const,
                    timestamp: new Date() }
                ]
            })),
            
            on(sendMessageFailure, (state, { error }) => ({
                ...state,
                loading: false,
                error: error
            }))
        );