import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from './confirm-password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signInForm = this.formBuilder.group({
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  onSave() {
    console.log('haha merge')
  }

  onCancel() {
    this.router.navigate(['/'])
  }
}
