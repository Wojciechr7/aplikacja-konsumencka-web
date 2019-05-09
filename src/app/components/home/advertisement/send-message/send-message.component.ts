import {SentMessage} from '../../../../models/conversation/sent-message';
import {Component, OnInit, Input} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../services/auth.service';
import {MatDialogRef} from '@angular/material';
import {MessageDialogComponent} from '../../../../dialogs/message/message.dialog';
import {SignalRService} from '../../../../services/signal-r.service';
import {Advertisement} from '../../../../models/advertisement/advertisement';
import {MessageService} from '../../../../services/message.service';

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
    public messageForm: FormGroup;
    @Input() userId: Observable<Advertisement>;
    @Input() senderId: string;
    @Input() dialogRef: MatDialogRef<MessageDialogComponent>;

    constructor(private formBuilder: FormBuilder,
                public messageService: MessageService,
                private toastr: ToastrService,
                public authenticationService: AuthService,
                private signalR: SignalRService) {
    }

    get f(): any { return this.messageForm.controls; }



    onSubmit() {
        if (this.messageForm.valid) {
            const message: SentMessage = {
                text: this.messageForm.value.text
            };
            if (!this.senderId) {
                this.userId.subscribe((ad: Advertisement) => {
                    if (this.authenticationService.currentUserValue) {
                        if (this.authenticationService.currentUserValue.id !== ad.userId) {
                            this.signalR.sendDirectMessage(ad.userId, message as SentMessage);
                            this.messageService.sendMessage(ad.userId, message as SentMessage).subscribe(() => {
                                this.toastr.success('Message Has Been Sent', 'Success!');
                                this.messageForm.get('text').setValue('');
                            });
                        } else {
                            this.toastr.error('You Can Not Send The Message To Yourself', 'Error!');
                        }
                    } else {
                        this.toastr.warning('You Must Sign In To Send Messages', 'Warning!');
                    }
                });
            } else {
                if (this.authenticationService.currentUserValue.id !== this.senderId) {
                    this.signalR.sendDirectMessage(this.senderId, message as SentMessage);
                    this.messageService.sendMessage(this.senderId, message as SentMessage).subscribe(() => {
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
