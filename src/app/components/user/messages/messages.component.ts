import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {ConversationData} from '../../../models/conversation/conversation-data';
import {MatDialog} from '@angular/material';
import {MessageDialogComponent} from '../../../dialogs/message/message.dialog';
import {Message} from '../../../models/conversation/message';
import {Conversation} from '../../../models/conversation/conversation';
import {DialogData} from '../../../dialogs/edit-profile/edit-profile.dialog';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit {

    private step: number;
    private conversations: Array<Conversation>;
    @ViewChildren('scrollChat') private scrollContainers: QueryList<ElementRef>;

    constructor(private messageService: MessageService, public dialog: MatDialog) {
        this.step = null;
        this.conversations = [];

    }

    get Conversations(): Array<Conversation> {
        return this.conversations;
    }

    set Step(index: number) {
        this.step = index;
    }

    public nextStep(): void {
        this.step++;
    }

    public prevStep(): void {
        this.step--;
    }

    public sendMessage(conversation: Conversation): void {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {senderId: conversation.data.senderId, messages: conversation.messages}
        });

        dialogRef.afterClosed().subscribe((senderId: string) => {
            if (senderId) {
                const conversationIndex = this.conversations.findIndex((c: Conversation) => c.data.senderId === senderId);
                this.showMessages(senderId, conversationIndex);
            }
        });
    }

    public showMessages(senderId: string, conversationIndex: number) {
        this.messageService.getMessages(senderId).subscribe((messages: Array<Message>) => {
            this.conversations[conversationIndex].messages = messages.reverse();
        });
    }

    ngOnInit() {
        this.messageService.getConversations().subscribe((conversations: Array<ConversationData>) => {
            conversations.forEach((conversation: ConversationData) => {
                if (!this.conversations.some((c: Conversation) =>
                    c.data.firstName === conversation.firstName && c.data.lastName === conversation.lastName)) {
                    this.conversations.push({data: conversation, messages: []} as Conversation);
                }
            });
        });
    }

    ngAfterViewInit() {
        this.scrollContainers.changes.subscribe(change => {
            change._results.forEach((result: ElementRef) => {
                result.nativeElement.scrollTop = result.nativeElement.scrollHeight;
            });
        });
    }

}
