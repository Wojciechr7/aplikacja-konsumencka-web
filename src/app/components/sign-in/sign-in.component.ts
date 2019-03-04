import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {LoginData} from '../../models/login';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public hide: boolean;
  public signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthService) {
    this.hide = true;
  }
  get f(): any { return this.signInForm.controls; }

  public onSubmit(): void {

    if (!this.signInForm.invalid) {
      this.authenticationService.loading = true;
      this.authenticationService.login(this.signInForm.value as LoginData).pipe(first())
          .subscribe((response) => {
            this.authenticationService.loading = false;
          });
    }
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }


}
