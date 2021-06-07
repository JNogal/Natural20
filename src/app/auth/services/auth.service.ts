import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserDto } from '../interfaces/user.interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pgresApiEndpoint: string = environment.pgresApiEndpoint;
  private _connectedUser: UserDto | undefined;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  get connectedUser() {
    return { ...this._connectedUser };
  }

  constructor(private http: HttpClient) {}

  getAllUsersPostgres() {
    return this.http.get<UserDto[]>(`${this.pgresApiEndpoint}/user-auth/users`);
  }

  checkSingleUserPassword(username: string, password: string) {
    return this.http.get<boolean>(
      `${this.pgresApiEndpoint}/user-auth/users/${username}/${password}`
    );
  }

  getUser(username: string) {
    return this.http
      .get<UserDto>(`${this.pgresApiEndpoint}/user-auth/users/${username}`)
      .pipe(tap((resp) => (this._connectedUser = resp)), tap((resp) => localStorage.setItem('token', String(resp.id))));
  }

  getUserById(id: number) {
    return this.http.get<UserDto>(
      `${this.pgresApiEndpoint}/user-auth/users/id/${id}`
    );
  }

  createUserPostgres(user: UserDto) {
    console.log(user);
    return this.http.post<UserDto>(
      `${this.pgresApiEndpoint}/user-auth/users/createUser`,
      user
    );
  }

  updateUserPostgres(user: UserDto) {
    return this.http.put<UserDto>(
      `${this.pgresApiEndpoint}/user-auth/users/${user.id}/upd`,
      user
    );
  }

  deleteUserPostgres(id: number) {
    return this.http.delete<any>(
      `${this.pgresApiEndpoint}/user-auth/users/${id}/dlt`
    );
  }

  async usnmCannotBeRepeated(checkedUsername: string) {
    let resp: boolean = false;
    let receivedUsers: UserDto[] = [];
    await this.getAllUsersPostgres()
      .toPromise()
      .then((users) => (receivedUsers = users));
    let usernames: string[] = [];
    receivedUsers.forEach((item) => {
      usernames.push(item.username);
    });
    usernames.forEach((item) => {
      if (item === checkedUsername) {
        resp = true;
      }
    });
    if (resp) {
      return resp;
    } else {
      return false;
    }
  }

  async emailCannotBeRepeated(checkedEmail: string) {
    let resp: boolean = false;
    let receivedUsers: UserDto[] = [];
    await this.getAllUsersPostgres()
      .toPromise()
      .then((users) => (receivedUsers = users));
    let emails: string[] = [];
    receivedUsers.forEach((item) => {
      emails.push(item.email);
    });
    emails.forEach((item) => {
      if (item === checkedEmail) {
        resp = true;
      }
    });
    if (resp) {
      return true;
    } else {
      return false;
    }
  }

  checkPasswords(pwd: string, matchPwd: string) {
    if (pwd === matchPwd) {
      return true;
    } else {
      return false;
    }
  }

  verifyAuth(): Observable<boolean> {
    if(!localStorage.getItem('token')) {
      return of(false);
    }

    return this.getUserById(Number(localStorage.getItem('token')))
      .pipe(
        map( user => {
          return true;
        })
      )
  } 

  logout() {
    this._connectedUser = undefined;
    localStorage.removeItem('token');
  }
}
