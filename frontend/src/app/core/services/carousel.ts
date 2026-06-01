import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Carousel {

  url = 'http://127.0.0.1:5000/carousel/';

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

  deleteCarousel(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  };

  update(id: any, data: any){
    return this.http.put(this.url + 'update/' + id, data);
  };

}
