import { Injectable } from '@angular/core';
import { config } from '../app/configs/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService {
  readonly rootUrl = config.hostUrl;

  constructor(private http: HttpClient) { }

  authenticateUser(query:any){  
    var reqHeader = new HttpHeaders({'No-Auth':'True' });
    return this.http.post(this.rootUrl + 'user/auth/login', query, { headers: reqHeader });
  } 

  getToken() {
    return localStorage.getItem('userToken')
  }
}
