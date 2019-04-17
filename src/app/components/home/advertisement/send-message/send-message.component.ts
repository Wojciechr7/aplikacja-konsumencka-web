import { Ad } from './../../../../models/ad';
import { Message } from './../../../../models/message';
import { MessageService } from './../../../../services/message.service';
import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  public MessageForm: FormGroup;
  @Input()
  userId: Observable<Ad>;

  constructor(private formBuilder: FormBuilder, public messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.MessageForm = this.formBuilder.group({
      title: new FormControl(''),
      text: new FormControl('')
    });
  }
  onSubmit() {
    if(this.MessageForm.valid) {
      const message: Message = {
        text: this.MessageForm.value.title
      };
      this.userId.subscribe((ad: Ad) => {
        this.messageService.sendMessage(ad.userId, message).subscribe(() => {
          this.toastr.success('Message hs been send', 'Success!')
        });
      });
    }
  }

}
