import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatListItem, ChatResponseDto, CreateChatRequest } from '../models/chat.model';

@Injectable({
    providedIn: 'root'
})

export class ChatService {    
    private apiUrl = 'http://localhost:8080/api/chat'; 
    
    constructor(private http: HttpClient) {}
    
    createChat(request: CreateChatRequest): Observable<ChatResponseDto> {
        return this.http.post<ChatResponseDto>(this.apiUrl, request);
    }
    
    getUserChats(): Observable<ChatListItem[]> {
        return this.http.get<ChatListItem[]>(this.apiUrl);
    }
    
    sendMessage(chatId: string, content: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/${chatId}/messages`, { content });
    }
}