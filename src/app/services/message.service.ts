import {SentMessage} from '../models/conversation/sent-message';
import {Observable} from 'rxjs';
import {GLOBAL} from './../config';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConversationData} from '../models/conversation/conversation-data';
import {ReceivedMessage} from '../models/conversation/received-message';
import {Conversation} from '../models/conversation/conversation';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private conversations: Array<Conversation>;

    constructor(private http: HttpClient) {
        this.conversations = [];
    }

    get Conversations(): Array<Conversation> {
        return this.conversations;
    }

    public sendMessage(id: string, content: SentMessage): Observable<SentMessage> {
        return this.http.post<SentMessage>(`${GLOBAL.URL}/users/messages/${id}`, content);
    }

    public getConversations(): Observable<Array<ConversationData>> {
        return this.http.get<Array<ConversationData>>(`${GLOBAL.URL}/users/messages/conversations`);
    }

    public getMessages(id: string): Observable<Array<ReceivedMessage>> {
        return this.http.get<Array<ReceivedMessage>>(`${GLOBAL.URL}/users/messages/${id}`);
    }

    public addDynamicMessage(message: string, sender: any): void {
        const conversationIndex = this.conversations.findIndex((c: Conversation) => c.data.userId === sender.id);

         if (this.conversations[conversationIndex] && this.conversations[conversationIndex].messages) {
             const date = new Date();
             date.setHours(date.getHours() - 2);
             this.conversations[conversationIndex].messages.push({
                 content: message,
                 date: date,
                 firstName: sender.user.firstName,
                 lastName: sender.user.lastName
             });
         }
    }


}
