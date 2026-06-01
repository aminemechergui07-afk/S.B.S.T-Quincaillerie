import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import { Order } from '../../core/services/order';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-management.html',
  styleUrls: ['./order-management.css']
})
export class OrderManagement implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;

  constructor(private _order: Order, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this._order.allCart().subscribe({
      next: (res: any) => {
        this.orders = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Order',
          text: err.error.message,
        });
      },
    });
  }

  changeStatus(id: string, status: string) {
    this._order.update(id, { status }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Statut mis à jour',
          text: `La commande est maintenant : ${status}`,
          timer: 1500,
          showConfirmButton: false
        });
        this.loadOrders();
      },


    });
  }



  deleteOrder(id: any) {
           Swal.fire({
             title: 'Are you sure?',
             text: "You won't be able to revert this!",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes, delete it!',
           }).then((result) => {
             if (result.isConfirmed) {
               this._order.delete(id).subscribe({
                 next: (res) => {
                   this.ngOnInit();
                 },
                 error: (err) => {
                   Swal.fire({
                   icon: 'error',
                   title: "Team Not Delete",
                   text: err.error.message,
                  });
                 },
               });
             }
           });
         }


}
