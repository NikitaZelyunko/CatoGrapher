import { Component } from '@angular/core';
import { MainService} from './main.service';
import { NgForm} from '@angular/forms';
import { NgModel } from '@angular/forms';
import { UploadImageService } from './upload-image.service';
import { RegisterService } from './register.service';
import { error } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  img: any;
  form: any = {};
  file: File;
  data: any= {};
  error: any= {};
  constructor(
    private uploadImageService: UploadImageService,
    private registerService: RegisterService
  ) {
    this.form = {
  };
  }

  fileChange(event): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
          const file = fileList[0];
          const url = 'http://127.0.0.1:8000/CatoGrapher/ang123/';
          this.uploadImageService.uploadFile(url, file)
          .subscribe();
      }
  }

  addPhoto(event): void {
    let target = event.target || event.srcElement;
    let reader = new FileReader();
    reader.onload = _ => {
      this.img = reader.result;
    };
    this.file = target.files[0];
    reader.readAsDataURL(this.file);
  }
  submit_register() {
    let final_data;
    const formData = new FormData();

    if (this.file) {
        let file: File = this.file;

            formData.append('file', file);
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
}
