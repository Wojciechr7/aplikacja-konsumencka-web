import {Ad} from './../../../../models/ad';
import {SentMessage} from '../../../../models/conversation/sent-message';
import {MessageService} from './../../../../services/message.service';
import {Component, OnInit, Input} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../services/auth.service';
import {MatDialogRef} from '@angular/material';
import {MessageDialogComponent} from '../../../../dialogs/message/message.dialog';

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
    public messageForm: FormGroup;
    @Input() userId: Observable<Ad>;
    @Input() senderId: string;
    @Input() dialogRef: MatDialogRef<MessageDialogComponent>;

    constructor(private formBuilder: FormBuilder,
                public messageService: MessageService,
                private toastr: ToastrService,
                public authenticationService: AuthService) {
    }

    get f(): any { return this.messageForm.controls; }



    onSubmit() {
        if (this.messageForm.valid) {
            const message: SentMessage = {
                text: this.messageForm.value.text
            };
            if (!this.senderId) {
                this.userId.subscribe((ad: Ad) => {
                    if (this.authenticationService.currentUserValue.id !== ad.userId) {
                        this.messageService.sendMessage(ad.userId, message as SentMessage).subscribe(() => {
                            this.toastr.success('Message Has Been Sent', 'Success!');
                            this.messageForm.get('text').setValue('');
                        });
                    } else {
                        this.toastr.error('You Can Not Send The Message To Yourself', 'Error!');
                    }
                });
            } else {
                if (this.authenticationService.currentUserValue.id !== this.senderId) {
                    this.messageService.sendMessage(this.senderId, message as SentMessage).subscribe((m) => {
                        this.toastr.success('Message Has Been Sent', 'Success!');
                        this.dialogRef.close(this.senderId);
                    });
                } else {
                    this.toastr.error('You Can Not Send The Message To Yourself', 'Error!');
                }
            }
        }

    }

    ngOnInit() {
        this.messageForm = this.formBuilder.group({
            text: ['', Validators.required]
        });
    }

}
