import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    message: string;
    adTitle: string;
}

@Component({
    selector: 'app-info-dialog',
    templateUrl: 'confirm.dialog.html',
})
export class ConfirmDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    closeDialog(decision: boolean): void {
        this.dialogRef.close(decision);
    }


}
