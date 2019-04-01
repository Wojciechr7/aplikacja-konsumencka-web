import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {LoginData} from '../../models/login';
import {first} from 'rxjs/operators';
import {RegisterData} from '../../models/register';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {checkPassword} from '../../helpers/checkPassword.validator';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public hide: boolean;
  public signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public authenticationService: AuthService,
              private router: Router, private toastr: ToastrService) {
    this.hide = true;
  }
  get f(): any { return this.signUpForm.controls; }

  public onSubmit(): void {

    if (!this.signUpForm.invalid) {
      this.authenticationService.loading = true;
      this.authenticationService.register(this.signUpForm.value as RegisterData)
          .subscribe(() => {
            this.authenticationService.loading = false;
            this.toastr.success('Registration Complete', 'Success!');
            this.router.navigate(['/sign-in']);
          }, error => {
            this.authenticationService.loading = false;
          });
    }
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],
      PhoneNumber: new FormControl('',
        [Validators.required, Validators.pattern('^(?:\\(?\\+?48)?(?:[-\\.\\(\\)\\s]*(\\d)){9}\\)?$')])
    }, {validator: checkPassword('password', 'confirmPassword') });
  }

}
