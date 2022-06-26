import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  getUsers() {
    this.http
      .get<{message: string, users: any}>('http://localhost:3000/api/users')
      .pipe(map((userData) => {
        return userData.users.map((user: { _id: any; lastname: string; firstname: string; username: string; email: string; password: string; }) => {
          return {
            id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            password: user.password
          };
        });
      }))
      .subscribe(transformedUsers => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id :string | null) {
    return this.http.get<{ _id: any; lastname: string; firstname: string; username: string; email: string; password: string; }>("http://localhost:3000/api/users/" + id);
  }

  addUser(lastname: string, firstname: string, username: string, email: string, password: string) {
    let userData = { lastname: lastname, firstname: firstname, username: username, email: email, password: password };

    this.http.post<{ message: string, user: User }>('http://localhost:3000/api/users', userData).subscribe((responseData) => {
      const user: User = {id: responseData.user.id, lastname: lastname, firstname: firstname, username: username, email: email, password: password};
      this.users.push(user);
      this.usersUpdated.next([...this.users]);
      this.router.navigate(["/"]);
    });
  }
}



