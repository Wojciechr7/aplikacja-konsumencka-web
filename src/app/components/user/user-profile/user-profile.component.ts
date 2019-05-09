import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {RegisterData} from '../../../models/user/register';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material';
import {DialogData, EditProfileDialogComponent} from '../../../dialogs/edit-profile/edit-profile.dialog';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
     const user: RegisterData = {
        firstName: this.editProfileForm.value.firstName,
        lastName: this.editProfileForm.value.lastName,
        email: this.editProfileForm.value.email,
        phoneNumber: this.editProfileForm.value.PhoneNumber,
        password: this.userInfo.password
      };
      this.openDialog(user);
    }
  }
  public updateUser(newUser: RegisterData) {
    this.userService.updateUserInfo(this.userId, newUser).subscribe(() => {
      this.toastr.success('Data has been changed', 'Success!');
      this.edit = false;
      this.userInfo = newUser;
      const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorageUser.firstName = newUser.firstName;
      localStorageUser.lastName = newUser.lastName;
      localStorageUser.email = newUser.email;
      localStorageUser.phoneNumber = newUser.phoneNumber;
      localStorage.setItem('currentUser', JSON.stringify(localStorageUser));
    });
  }
  openDialog(user?: RegisterData, target?: string) {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: `260px`,
      data: {type: target, oldPassword: ''}
    });
    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
          user.oldPassword = result.oldPassword;
          if (result.value) {
            user.password = result.value;
          }
          this.updateUser(user);
      }
    });
  }
  public enableEdit() {
    this.editProfileForm.get('firstName').setValue(this.userInfo.firstName);
    this.editProfileForm.get('lastName').setValue(this.userInfo.lastName);
    this.editProfileForm.get('email').setValue(this.userInfo.email);
    this.editProfileForm.get('PhoneNumber').setValue(this.userInfo.phoneNumber);
    this.edit = !this.edit;
  }
  get f(): any { return this.editProfileForm.controls; }
}
