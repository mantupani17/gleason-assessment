import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from './../configs/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = config.hostUrl;

  constructor(private http: HttpClient) { }

  getUserCount(){
    return this.http.get(this.rootUrl + 'user/count');
  }

  // registering the user
  saveUser(user){
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'user', user, {headers : reqHeader});
  }

  getUserDetails(query) {
    let params = new HttpParams();
    params = params.append('fields', query.fields);
    return this.http.get(this.rootUrl+'user', {params: params});
  }

  // remove users
  removeUser(id){
    return this.http.delete(this.rootUrl + 'user?_id='+id);
  }

}
