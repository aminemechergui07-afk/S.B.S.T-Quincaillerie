import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class News {


    url = 'http://127.0.0.1:5000/news/';

  constructor(private http: HttpClient){}

  create(data: any){
    return this.http.post(this.url + 'ajout', data);
  };

  all(){
    return this.http.get(this.url + 'list');
  };

  byId(id: any){
    return this.http.get(this.url + 'byId/' + id);
  };

  deleteNew(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  };

  update(id: any, data: any){
    return this.http.put(this.url + 'update/' + id, data);
  };

}
