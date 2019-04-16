import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../services/message.service';
import {PostMessage} from '../../../../models/message';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-send-msg',
    templateUrl: './send-msg.component.html',
    styleUrls: ['./send-msg.component.scss']
})
export class SendMsgComponent implements OnInit {
    public msgForm: FormGroup;
    public text: string;

    constructor(public messageService: MessageService, private formBuilder: FormBuilder) { }

    get f(): any {
        return this.msgForm.controls;
    }

    public onSubmit(): void {
        const message = {
            text: this.text = this.msgForm.value.msgFormControl
        };
        this.messageService.postMessage(message as PostMessage, 'DD8FCBF9-7353-4265-8E7D-711AB41C91CF').subscribe((msg) => {
            console.log(msg);
        });
    }

    ngOnInit() {
        this.msgForm = this.formBuilder.group({
            msgFormControl: new FormControl('')
        });
    }

}
