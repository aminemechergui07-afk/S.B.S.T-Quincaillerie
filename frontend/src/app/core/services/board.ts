import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Board {

  url= 'http://127.0.0.1:5000/board/'

  constructor(private http: HttpClient){}

  create(data: any){
    return this.http.post(this.url + 'ajout', data);
  }

   list(){
    return this.http.get(this.url + 'list');
  }

  byId(id: any){
    return this.http.get(this.url + 'byId/' + id);
  }

  update(id: any, data:any){
    return this.http.put(this.url + 'update/' + id, data)
  }

}
