import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public loading: boolean;
  public hide: boolean;
  public signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loading = false;
    this.hide = true;
  }
  get f(): any { return this.signInForm.controls; }

  public onSubmit(): void {

    if (!this.signInForm.invalid) {
      this.loading = true;
      console.log(this.signInForm.value);
    }

  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

}
