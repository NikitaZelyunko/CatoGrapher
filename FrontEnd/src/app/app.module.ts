import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainService } from './main.service';
import { UploadImageService } from './upload-image.service';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { FileModelDirective } from './file-model.directive';


@NgModule({
  declarations: [
    AppComponent,
    FileModelDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MainService,
    UploadImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
