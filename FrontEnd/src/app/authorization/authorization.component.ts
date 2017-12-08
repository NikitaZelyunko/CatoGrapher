import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };
  token: any;
  error: any;
  url = 'http://127.0.0.1:8000/auth/login/';
  redirect = 'http://127.0.0.1:4200/home';

  constructor(private http: HttpClient, private location: Location) {
    // this.location = location;
    // console.log(this.location);

  }

  ngOnInit() {
    const menu = window.document.getElementById('menu');
    menu.style.display = 'none';
    const header = window.document.getElementById('header');
    header.style.display = 'none';
    const content = window.document.getElementById('content');
    content.style.width = '100%';
    content.style.height = '100%';
  }

  validate() {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const address = this.user.email;
    const passwd = this.user.password;
    if (reg.test(address) === false) {
      alert('Введите корректный e-mail');
      return false;
    }
    if (passwd.length < 8) {
      alert('Ваш пароль должен содержать больше 8 символов');
      return false;
    }
    return true;
  }
  autorization_btn(): void {
    if (this.validate()) {
      const body = {email: this.user.email, password: this.user.password};

      const params = new HttpParams();
      this.http.post(this.url, body).subscribe(data => {
        this.token = data;
        console.log(this.token);
        localStorage.setItem('Token', this.token);
        window.location.href = this.redirect;
      },
        err => {
                  if (err) {
                    this.error = err;
                    alert(err.error.error);
                  }
      });
      console.log('ok', this.token);
    }
  }
}
