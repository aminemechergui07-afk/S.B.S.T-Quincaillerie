import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Order {
  url = 'http://127.0.0.1:5000/order/';

  orderCountSubject = new BehaviorSubject<number>(0);
  orderCount$ = this.orderCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  private updateCount = tap((orders: any) => {
    if (Array.isArray(orders)) {
      this.orderCountSubject.next(orders.length);
    }
  });

  create(data: any) {
    return this.http.post(this.url + 'create', data).pipe(
      tap(() => this.orderCountSubject.next(this.orderCountSubject.value + 1))
    );
  }

  allCart() {
    return this.http.get(this.url + 'all').pipe(this.updateCount);
  }

  delete(id: any){
    return this.http.delete(this.url + 'delete/' + id)
  }

  update(id: any, data: any) {
    return this.http.put(this.url + 'update-status/' + id, data);
  }
}
