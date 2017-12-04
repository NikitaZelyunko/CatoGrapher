import { Component } from '@angular/core';
import { MainService} from './main.service';
import { NgForm} from '@angular/forms';
import { NgModel } from '@angular/forms';
import { } from 'ng-file-upload';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  constructor(private uploadImageService: UploadImageService) {}

  fileChange(event): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
          const file = fileList[0];
          const url = 'http://127.0.0.1:8000/CatoGrapher/ang123/';
          this.uploadImageService.uploadFile(url, file)
          .subscribe();
      }
  }
}
