import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Importando os novos modelos que definimos
import { 
    ChatSummaryDto, 
    CreateChatDto, 
    MessageResponseDto, 
    ChatHistoryDto, 
    MessageRequestDto 
} from '../models/chat.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {    
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/chat'; 
    
    // 1. Criar Chat
    createChat(request: CreateChatDto): Observable<ChatHistoryDto> {
        // Assume que o backend retorna o objeto do chat criado
        return this.http.post<ChatHistoryDto>(this.apiUrl, request);
    }
    
    // 2. Listar Chats (Sidebar)
    getUserChats(): Observable<ChatSummaryDto[]> {
        return this.http.get<ChatSummaryDto[]>(this.apiUrl);
    }
    
    // 3. Carregar Histórico de um Chat (NOVO - Usado pelo loadMessages$)
    getChatById(chatId: string): Observable<ChatHistoryDto> {
        return this.http.get<ChatHistoryDto>(`${this.apiUrl}/${chatId}`);
    }
    
    // 4. Enviar Mensagem
    sendMessage(chatId: string, content: string): Observable<MessageResponseDto> {
        const body: MessageRequestDto = { content };
        return this.http.post<MessageResponseDto>(`${this.apiUrl}/${chatId}/messages`, body);
    }
    
    // 5. Deletar Chat
    deleteChat(chatId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${chatId}`);
    }
    
    // 6. Renomear Chat
    updateChatTitle(chatId: string, title: string): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${chatId}`, { title });
    }
}