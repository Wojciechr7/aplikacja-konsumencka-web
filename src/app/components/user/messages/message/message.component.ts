import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() date: Date;
  @Input() content: string;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {

  }

}
