import { Component } from '@angular/core';
import { MainService} from './main.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  req: any;
  results = '';
  file: any;
  url: any;
  urlServer= 'http://127.0.0.1:8000';
  constructor(private mainService: MainService) {
    console.log('ok1');
    mainService.get('http://127.0.0.1:8000/CatoGrapher/ang/')
      .subscribe(value => this.results = this.urlServer + value['href']);
  }
  showForm(myForm: NgForm) {
    console.log(myForm.controls['avatar']);
    //this.previewFile(myForm.controls['avatar']);

 }

  show(): void {
    console.log(this.results);
    console.log(this.file);
    console.log(this.url);
  }

   previewFile(file): void {
    var preview = document.querySelector('img');
    console.log(file);
    
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      console.log(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(this.file);
    } else {
      preview.src = "";
    }
  }

  }
