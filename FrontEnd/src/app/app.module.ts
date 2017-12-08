import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MainService } from './main.service';
import { RegisterService } from './register.service';
import { UploadImageService } from './upload-image.service';
import { UserAuthService } from './user-auth.service';

import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { FileModelDirective } from './file-model.directive';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationComponent } from './registration/registration.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomepageComponent } from './homepage/homepage.component';
import { from } from 'rxjs/observable/from';

@NgModule({
  declarations: [
    AppComponent,
    FileModelDirective,
    RegistrationComponent,
    AuthorizationComponent,
    HomepageComponent
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
    UserAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
