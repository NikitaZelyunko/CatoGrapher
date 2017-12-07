import { Component } from '@angular/core';
import { MainService} from './main.service';
import { NgForm} from '@angular/forms';
import { NgModel } from '@angular/forms';
import { UploadImageService } from './upload-image.service';
import { RegisterService } from './register.service';
import { error } from 'util';

const allowed_extension = ['jpg', 'jpeg', 'png', 'ico', 'gif'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
]
})


export class AppComponent  {
  img: any;
  form: any = {};
  file: File;
  img_is_set= false;
  data: any= {};
  error: any= {};
  constructor(
    private uploadImageService: UploadImageService,
    private registerService: RegisterService
  ) {
    this.form = {
  };
  }

  addPhoto(event): void {
    let target = event.target || event.srcElement;
    //console.log(target.files[0].name);
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
      this.img = null;
      this.img_is_set = false;
    }

  }

  form_valid(): boolean {

    if (!this.form['email'])
    {
      alert('set email');
      return false;
    }
    /*
    let email_without_dog=this.form['email'].split('@');
    if(email_without_dog.length)
    {
      alert('set correct email');
      return false;
    }
    */
    if (!this.form['nickname'])
    {
      alert('set nickname');
      return false;
    }

    if (!this.form['password'])
    {
      alert('set password');
      return false;
    }
    return true;
  }
  submit_register() {
    let final_data;
    const formData = new FormData();
    if (this.img_is_set) {
      console.log(this.file.name);
      if (allowed_extension.indexOf(this.file.name.split('.')[1], 0) !== -1) {
        let file: File = this.file;
        formData.append('avatar', file);
      }
      formData.append('data', JSON.stringify(this.form));
      final_data = formData;

      this.registerService.register(final_data)
      .subscribe(
        data => {
          this.data = data;
          console.log(data);
        },
        err => {
          if (err) {
            this.error = err;
            console.log('Something went wrong!', err);
          }
        }
        );
    }
    else {
      alert('file extension is not support');
    }
  }
}
