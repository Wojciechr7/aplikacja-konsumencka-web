import {Ad} from './../../../../models/ad';
import {Message} from './../../../../models/message';
import {MessageService} from './../../../../services/message.service';
import {Component, OnInit, Input} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../services/auth.service';

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
    public messageForm: FormGroup;
    @Input() userId: Observable<Ad>;

    constructor(private formBuilder: FormBuilder,
                public messageService: MessageService,
                private toastr: ToastrService,
                public authenticationService: AuthService) {
    }

    get f(): any { return this.messageForm.controls; }



    onSubmit() {
        if (this.messageForm.valid) {
            const message: Message = {
                text: this.messageForm.value.text
            };
            this.userId.subscribe((ad: Ad) => {
                this.messageService.sendMessage(ad.userId ? ad.userId : '0', message as Message).subscribe(() => {
                    this.toastr.success('Message Has Been Sent', 'Success!');
                    this.messageForm.get('text').setValue('');
                });
            });
        }
    }

    ngOnInit() {
        this.messageForm = this.formBuilder.group({
            text: ['', Validators.required]
        });
    }

}
