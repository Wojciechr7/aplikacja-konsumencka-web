import {ConversationData} from './conversation-data';
import {Message} from './message';

export interface Conversation {
    data: ConversationData;
    messages: Array<Message>;
}
