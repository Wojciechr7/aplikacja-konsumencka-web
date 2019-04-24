import { Message } from './../models/message';
import { Observable } from 'rxjs';
import { GLOBAL } from './../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public sendMessage(id: string, content: Message): Observable<Message> {
    return this.http.post<Message>(`${GLOBAL.URL}/users/messages/${id}`, content);
  }

  public getMessages(id: string): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(`${GLOBAL.URL}/users/messages/${id}`);
  }
}
