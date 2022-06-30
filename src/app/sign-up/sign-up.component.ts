import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ConfirmedValidator } from './confirm-password-validator';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private messageService: MessageService
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
    if(this.signInForm.invalid){
      return;
    }
    let signInFormData = this.signInForm.getRawValue();

    this.usersService.addUser(signInFormData.lastname, signInFormData.firstname, signInFormData.username, signInFormData.email, signInFormData.password);
    this.messageService.add({severity:'success', summary:'Succes', detail:'Datele au fost salvate!'});
  }

  onCancel() {
    this.router.navigate(['/'])
  }
}
