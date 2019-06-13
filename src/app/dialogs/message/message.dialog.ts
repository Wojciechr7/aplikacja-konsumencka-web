import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    message: string;
    adTitle: string;
    senderId: string;
}

@Component({
    selector: 'app-message-dialog',
    templateUrl: 'message.dialog.html',
})
export class MessageDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

}
