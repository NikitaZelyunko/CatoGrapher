import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UploadImageService {

  constructor(private http: HttpClient) { }

    uploadFile(url: string, file: File): Observable<any> {
  
      let formData = new FormData();
      formData.append('upload', file);
      console.log(file);
  
      let params = new HttpParams();
  
      const options = {
        params: params,
        reportProgress: true,
      };
      return this.http.post(url, formData, options);
    }

}