import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  failedLogin: boolean = false;

  usernameError: boolean = false;
  passwordError: boolean = false;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(
    private formBuilder: FormBuilder
  ) {}

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.usernameError = false;
    this.passwordError = false;

    const formValues = this.loginForm.getRawValue();
    if (!formValues.username) {
      this.usernameError = true;
    }

    if(!formValues.password) {
      this.passwordError = true;
    }

    console.log('heeeeeeeeey');
  }
}
