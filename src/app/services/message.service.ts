import { SentMessage } from '../models/conversation/sent-message';
import { Observable } from 'rxjs';
import { GLOBAL } from './../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConversationData} from '../models/conversation/conversation-data';
import {ReceivedMessage} from '../models/conversation/received-message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public sendMessage(id: string, content: SentMessage): Observable<SentMessage> {
    return this.http.post<SentMessage>(`${GLOBAL.URL}/users/messages/${id}`, content);
  }

  public getConversations(): Observable<Array<ConversationData>> {
    return this.http.get<Array<ConversationData>>(`${GLOBAL.URL}/users/messages/conversations`);
  }

  public getMessages(id: string): Observable<Array<ReceivedMessage>> {
    return this.http.get<Array<ReceivedMessage>>(`${GLOBAL.URL}/users/messages/${id}`);
  }
}
