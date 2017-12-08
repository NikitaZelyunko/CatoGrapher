import { Injectable } from '@angular/core';
import { UserModel } from './user';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { from } from 'rxjs/observable/from';

const url_server = 'http://127.0.0.1:8000/';
const url_login = 'http://127.0.0.1:8000/auth/login/';
const url_get_user = 'http://127.0.0.1:8000/auth/get-user/';


@Injectable()
export class UserAuthService {

  user = this.load_user();

  constructor(
    private httpClient: HttpClient,
    private router: Router) {

     }


  showErrors(error): void {
    console.log(error.error);
    if (error.error['error']) {
      alert('not correct email or password');
    }

  }

  authUser(email, password) {
    this.httpClient.post(url_login, {'email': email, 'password': password})
      .subscribe(
        data => {
          this.user.token = data['token'];
          this.set_user_info();
          this.router.navigate(['home']);
        },
        err => {
          this.showErrors(err);
        }
      )
    ;
  }

  private set_user_info() {
    this.httpClient
    .get(url_get_user, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.user.token),
    })
    .subscribe(
      data => {
        this.user.avatar = url_server + data['avatar'];
        this.user.first_name = data['first_name'];
        this.user.last_name = data['last_name'];
        this.user.nickname = data['nickname'];
        localStorage.setItem('CatoGrapherUser', JSON.stringify(this.user));
        console.log(this.user);
      },
      err => this.showErrors(err)
    );

  }

  public get_user(): UserModel {
    return this.user;
  }

  private load_user(): UserModel {
    let user = new UserModel();
    if (localStorage.getItem('CatoGrapherUser')) {
      let data_user = JSON.parse(localStorage.getItem('CatoGrapherUser'));
      
            user.nickname = data_user.nickname;
            user.last_name = data_user.last_name;
            user.first_name = data_user.first_name;
            user.avatar = data_user.avatar;
    }
    console.log(user);
    return user;
  }




}
