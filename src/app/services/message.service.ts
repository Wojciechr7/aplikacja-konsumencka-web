import { Message } from './../models/message';
import { Observable } from 'rxjs';
import { GLOBAL } from './../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Conversation} from '../models/conversation';
import {ReceivedMessage} from '../models/received-message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public sendMessage(id: string, content: Message): Observable<Message> {
    return this.http.post<Message>(`${GLOBAL.URL}/users/messages/${id}`, content);
  }

  public getConversations(): Observable<Array<Conversation>> {
    return this.http.get<Array<Conversation>>(`${GLOBAL.URL}/users/messages/conversations`);
  }

  public getMessages(id: string): Observable<Array<ReceivedMessage>> {
    return this.http.get<Array<ReceivedMessage>>(`${GLOBAL.URL}/users/messages/${id}`);
  }
}
