import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {RegisterData} from '../../../models/register';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material';
import {DialogData, EditProfileDialogComponent} from '../../../dialogs/edit-profile/edit-profile.dialog';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {checkPassword} from '../../../helpers/checkPassword.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  entryComponents: [EditProfileDialogComponent]
})
export class UserProfileComponent implements OnInit {
  public userId: string;
  public userInfo: RegisterData;
  public loading: boolean;
  public edit: boolean;
  public editProfileForm: FormGroup;

  constructor(public userService: UserService, public authService: AuthService, public dialog: MatDialog,  private toastr: ToastrService,
              private formBuilder: FormBuilder) {
    this.edit = false;
    this.loading = true;
    this.userId = authService.currentUserValue.id;
  }

  ngOnInit() {
    this.userService.getUserInfo(this.userId).subscribe((user: RegisterData) => {
      this.userInfo = user;
      this.loading = false;
    });
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: new FormControl('',
        [Validators.required, Validators.pattern('^(?:\\(?\\+?48)?(?:[-\\.\\(\\)\\s]*(\\d)){9}\\)?$')])
    });
  }
  public onSubmit() {
    if (this.editProfileForm.valid) {
      this.openDialog();
    }
  }
  public updateUser(newUser: RegisterData) {
    this.userService.updateUserInfo(this.userId, newUser).subscribe(() => {
      this.toastr.success('Data has been changed', 'Success!');
      this.userInfo = newUser;
    });
  }
  openDialog(target?: string) {
    const user: RegisterData = Object.assign({}, this.userInfo);
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: `250px`,
      data: {name: user.firstName, value: user[target], type: target, oldPassword: ''}
    });
    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        if (user[target] !== result.value && result.value) {
          user.oldPassword = result.oldPassword;
          user[target] = result.value;
          this.updateUser(user);
        }
      }
    });
  }
  public enableEdit() {
    this.edit = !this.edit;
  }
  get f(): any { return this.editProfileForm.controls; }
}
