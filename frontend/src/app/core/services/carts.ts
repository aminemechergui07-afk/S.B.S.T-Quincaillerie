import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Carts {

 url = 'http://127.0.0.1:5000/cart/';

 cartCountSubject = new BehaviorSubject<number>(0);
 cartCount$ = this.cartCountSubject.asObservable();

 constructor(private http: HttpClient){}

  private updateCount = tap((cart: any) => {
    if (cart && cart.items) {
      const count = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      this.cartCountSubject.next(count);
    } else {
      this.cartCountSubject.next(0);
    }
  });

  create(data: any){
    return this.http.post(this.url + 'ajout', data).pipe(this.updateCount);
  }

  getcart(userId: any){
    return this.http.get(this.url + 'getCart/' + userId).pipe(this.updateCount);
  }

  update(data: any){
    return this.http.put(this.url + 'update', data).pipe(this.updateCount);
  }

  deleteCart(userId: any, productId: any) {
    return this.http.delete(this.url + 'delete/' + userId + '/' + productId).pipe(this.updateCount);
  }

  resetCount() {
    this.cartCountSubject.next(0);
  }

}
