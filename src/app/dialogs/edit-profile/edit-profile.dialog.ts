import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    value?: string;
    oldPassword: string;
    type?: string;
}

@Component({
    selector: 'app-edit-profile.dialog',
    templateUrl: './edit-profile.dialog.html'
})
export class EditProfileDialogComponent {
    public hide: boolean;
    public disableButton = false;
    public passwordMatch: string;

    constructor(public dialogRef: MatDialogRef<EditProfileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        if (this.data.type === 'password') {
            this.disableButton = true;
        }
        this.hide = true;
        this.data.value = '';
    }

    onNoClick() {
        this.dialogRef.close();
    }

    checkValidation() {
        if (this.data.type === 'password') {
            this.disableButton = !(this.passwordMatch === this.data.value && this.data.value.length >= 8);
        }
    }

    SubmitOnEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            document.getElementById('updateButton').click();
        }
    }
}
