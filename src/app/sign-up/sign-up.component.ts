import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { ConfirmedValidator } from './confirm-password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signInForm!: FormGroup;
  usersSub: Subscription = new Subscription;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListener().subscribe( (users: User[]) => {
        this.users = users;
        console.log(this.users);
    });
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

  }

  onCancel() {
    this.router.navigate(['/'])
  }
}
