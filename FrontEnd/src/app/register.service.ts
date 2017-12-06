import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  url= 'http://127.0.0.1:8000/auth/register/';
  constructor(private http: HttpClient) { }

  register(form: FormData): Observable<any> {
    let params = new HttpParams();
        const options = {
          params: params,
        };

    return this.http.post(this.url, form, options);
  }


}
