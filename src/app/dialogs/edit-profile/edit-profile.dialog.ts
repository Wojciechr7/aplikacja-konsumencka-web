import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  value: string;
  oldPassword: string;
  type?: string;
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
  if (this.data.type === 'password') {
        this.disableButton = !(this.passwordMatch === this.data.value);
        this.disableButton = this.data.value.length < 8;
    } else {
        this.disableButton = false;
      }
  }
}
