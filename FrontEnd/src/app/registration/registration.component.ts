import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../upload-image.service';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

const allowed_extension = ['jpg', 'jpeg', 'png', 'ico', 'gif'];
const redirect = 'http://127.0.0.1:4200/authorization';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  img: any;
  form: any = {};
  file: File;
  img_is_set= false;
  data: any= {};
  error: any= {};

  constructor(
    private uploadImageService: UploadImageService,
    private registerService: RegisterService,
    private location: Location,
    private routing: Router
  ) {

    const menu = window.document.getElementById('menu');
    menu.style.display = 'none';
    const header = window.document.getElementById('header');
    header.style.display = 'none';
    const content = window.document.getElementById('content');
    content.style.width = '100%';
    content.style.height = '100%';
    content.style.background = '#fff';

    const container = window.document.getElementById('container');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.left = '0';

  }
  ngOnInit() {
    this.form = {
    };
  }

  addPhoto(event): void {
    let target = event.target || event.srcElement;
    if (allowed_extension.indexOf(target.files[0].name.split('.')[1], 0) !== -1) {
      let reader = new FileReader();
      reader.onload = _ => {
          this.img = reader.result;
          this.img_is_set = true;
      };
      this.file = target.files[0];
      reader.readAsDataURL(this.file);
    }
    else {
      this.img = '';
      this.file = null;
      this.img_is_set = false;
      alert('file extension is not support');
    }

  }

  submit_register(): boolean {
    console.log(this.img);
    let final_data;
    const formData = new FormData();
    if (this.img_is_set) {
      if (allowed_extension.indexOf(this.file.name.split('.')[1], 0) !== -1) {
        let file: File = this.file;
        formData.append('avatar', file);
      }
      else {
        return false;
      }
    }
      formData.append('data', JSON.stringify(this.form));
      final_data = formData;

      this.registerService.register(final_data)
      .subscribe(
        data => {
          this.data = data;
          console.log(data);
          this.routing.navigate(['authorization']);
        },
        err => {
          if (err) {
            this.error = err;
            this.showError(this.error);
            console.log('Something went wrong!', err);
          }
        }
        );
        return true;
  }

  showError(error): void {
    console.log(error.error);
    if (error.error['d']) {
      alert('User is exist');
      this.form['nickname'] = '';
      this.form['email'] = '';
      this.form['password'] = '';
      this.img_is_set = false;
    }

  }


}
