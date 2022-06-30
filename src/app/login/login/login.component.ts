import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user.model';
import { UsersService } from 'src/app/users.service';

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

  usersSub: Subscription = new Subscription;
  users: User[] = [];

  userNotExisting: boolean = false;

  ngOnInit(): void {
    this.buildForm();
    this.usersService.isLoggedIn.next(false);

    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListener().subscribe( (users: User[]) => {
        this.users = users;
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
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

    if(this.usernameError || this.passwordError) {
      return;
    }

    this.userNotExisting = true;
    this.users.forEach(user => {
      if(user.username === formValues.username && user.password === formValues.password) {
        this.usersService.username.next(user.username);
        this.userNotExisting = false;
        this.usersService.isLoggedIn.next(true);
        this.router.navigate(["/graphs-visualization"]);
      }
    });
  }
}
