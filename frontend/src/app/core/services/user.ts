import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {

  url = 'http://127.0.0.1:5000/user/';

  constructor(private http: HttpClient){}

  register(user: any){
    return this.http.post(this.url + 'register', user)
  };

  login(user: any){
    return this.http.post(this.url + 'login', user)
  };

  byId(id: any){
    return this.http.get(this.url + 'byId/' + id)
  };

  update(id: any, user:any){
    return this.http.put(this.url + 'update/' + id, user)
  }

}
