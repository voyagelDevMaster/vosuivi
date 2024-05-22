import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.voapiUrl
  constructor(public http: HttpClient) { }

  request(body: any, action: string) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
    let options = {
      headers: headers
    }
    return this.http.post(this.url + action, JSON.stringify(body), options)
      .pipe(map(res => res));
  }
}
