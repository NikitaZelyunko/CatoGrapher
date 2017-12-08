import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainService } from './main.service';
import { RegisterService } from './register.service';
import { UploadImageService } from './upload-image.service';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { FileModelDirective } from './file-model.directive';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationComponent } from './registration/registration.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    FileModelDirective,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AvatarModule
  ],
  providers: [
    MainService,
    UploadImageService,
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
