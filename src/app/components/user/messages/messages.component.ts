import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Conversation} from '../../../models/conversation';
import {AuthService} from '../../../services/auth.service';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    public step: number;
    public conversations;
    public messages;
    conversationsTest = [];

    constructor(private messageService: MessageService, private authenticationService: AuthService) {
        this.step = null;
        this.conversations = [];
        this.messages = [];

    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    sendEmail() {
        window.open('mailto:test@example.com');
    }

    ngOnInit() {
        this.messageService.getConversations().subscribe((conversations: Array<Conversation>) => {
            conversations.forEach(conversation => {
                this.conversations.push(conversation);

            });

            const firstNames = [];
            this.conversations = this.conversations.filter(conv => {
                if (!firstNames.includes(conv.firstName)) {
                    firstNames.push(conv.firstName);
                    return true;
                }
            });

            this.conversations.forEach(conv => {
                this.messageService.getMessages(conv.senderId).subscribe(messages => {
                    this.conversationsTest.push({
                        conv: conv,
                        messages: messages
                    });
                });
            });
        });
    }

}
