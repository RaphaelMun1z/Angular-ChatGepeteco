import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatListItem } from '../models/chat.model';

@Injectable({
    providedIn: 'root'
})

export class ChatService {    
    private apiUrl = 'http://localhost:8080/api/chat'; 
    
    constructor(private http: HttpClient) {}
    
    getUserChats(): Observable<ChatListItem[]> {
        return this.http.get<ChatListItem[]>(this.apiUrl);
    }
}