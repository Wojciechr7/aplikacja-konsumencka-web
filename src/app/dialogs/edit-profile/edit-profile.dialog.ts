import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  name: string;
  value: string;
  oldPassword: string;
  type: string;
}

@Component({
  selector: 'app-edit-profile.dialog',
  templateUrl: './edit-profile.dialog.html'
})
export class EditProfileDialogComponent {
  public hide: boolean;
  public disableButton = true;
  public passwordMatch: string;

  constructor(public dialogRef: MatDialogRef<EditProfileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.hide = true;
  }

  onNoClick() {
    this.dialogRef.close();
  }
  checkValidation() {
    if (this.data.type === 'email') {
      const emailPattern = this.data.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}');
      this.disableButton = !emailPattern;
      } else if (this.data.type === 'phoneNumber') {
      const phonePattern = this.data.value.match('^(?:\\(?\\+?48)?(?:[-\\.\\(\\)\\s]*(\\d)){9}\\)?$');
      this.disableButton = !phonePattern;
    } else if (this.data.type === 'password') {
        this.disableButton = !(this.passwordMatch === this.data.value);
        this.disableButton = this.data.value.length < 8;
    } else {
        this.disableButton = false;
      }
  }
}
