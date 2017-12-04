import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainService {
  request: any;

  constructor(private httpClient: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.httpClient.get(url, {responseType: 'json'});
  }
  public post(url: string): Observable<any> {
    return this.httpClient.post(url, {responseType: 'json'});
}
}
