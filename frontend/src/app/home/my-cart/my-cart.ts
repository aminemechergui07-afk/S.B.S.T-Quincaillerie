import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { Carts } from '../../core/services/carts';
import { Order } from '../../core/services/order';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-cart.html',
  styleUrls: ['./my-cart.css']
})
export class MyCart {
  readonly shippingFee = 7;
  carts: any = {
    items: [],
    totalPrice: 0
  };
  isSubmittingOrder = false;

  constructor(
    private _cart: Carts,
    private _order: Order,
    private _auth: Auth,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const user = this._auth.getDataFromToken();

    if (!user?._id) {
      this.carts = { items: [], totalPrice: 0 };
      this.cdr.detectChanges();
      return;
    }

    this._cart.getcart(user._id).subscribe({
      next: (res) => {
        this.carts = res;

        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'cart Not save',
          text: err.error.message,
        });
      },
    });
  }

  updateQuantity(productId: string, change: number) {
    const userId = this._auth.getDataFromToken()._id;
    this._cart.update({ userId, productId, change }).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'cart Not Update',
          text: err.error.message,
        });
      },
    });
  }

  deleteItem(productId: string) {
    const userId = this._auth.getDataFromToken()._id;
    this._cart.deleteCart(userId, productId).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'cart Not Delete',
          text: err.error.message,
        });
      },
    });
  }

  checkout() {
    if (this.isSubmittingOrder) {
      return;
    }

    const userId = this._auth.getDataFromToken()?._id;

    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Inscription requise',
        text: 'Pour valider votre commande, veuillez creer un compte.',
        confirmButtonText: "S'inscrire",
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/register'], {
            queryParams: { returnUrl: '/cart' },
          });
        }
      });
      return;
    }

    if (!this.carts?.items?.length) {
      Swal.fire('Erreur', 'Votre panier est vide', 'error');
      return;
    }

    this.isSubmittingOrder = true;

    this._order.create({
      userId,
      shippingDetails: { address: 'Pas encore renseignee' }
    }).pipe(
      finalize(() => {
        this.isSubmittingOrder = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.carts = { items: [], totalPrice: 0 };
        this._cart.resetCount();
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'success',
          title: 'Commande validee !',
          text: 'Votre panier a ete transforme en commande avec succes.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Voir la confirmation'
        }).then(() => {
          this.router.navigate(['/order-success']);
        });
      },
      error: (err) => {
        Swal.fire('Erreur', err.error.message || 'Impossible de valider la commande', 'error');
      }
    });
  }
}
