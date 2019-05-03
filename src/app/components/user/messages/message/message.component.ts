import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../../services/message.service';
import {AuthService} from '../../../../services/auth.service';
import {concat} from 'rxjs';
import {Message} from '../../../../models/conversation/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() date: Date;
  @Input() msg: Message;

  constructor(private messageService: MessageService, private authenticationService: AuthService) {
  }

  ngOnInit() {
  }

  public isMyMessage(): boolean {
    const loggedInUser = this.authenticationService.currentUserValue;
    return this.msg.firstName === loggedInUser.firstName && this.msg.lastName === loggedInUser.lastName;
  }

}
