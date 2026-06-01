import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Carts } from '../../../core/services/carts';
import { Order } from '../../../core/services/order';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  cartCount: number = 0;
  orderCount: number = 0;
  user: any = null;
  private subscriptions = new Subscription();
  private currentUserId: string | null = null;
  searchQuery: string = '';

  constructor(
    private _cart: Carts,
    private _order: Order,
    private _auth: Auth,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshUser();

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.refreshUser();
        }
      })
    );

    this.subscriptions.add(
      this._cart.cartCount$.subscribe((count) => {
        this.cartCount = count;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this._order.orderCount$.subscribe((count) => {
        this.orderCount = count;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get accountRoute(): string {
    return this.user?._id ? '/profile' : '/login';
  }

  get accountLabel(): string {
    return this.user?._id ? 'Mon profil' : 'Se connecter';
  }

  private refreshUser() {
    this.user = this._auth.getDataFromToken();
    const nextUserId = this.user?._id ?? null;
    const isAdmin = this.user?.role === 'admin';

    if (!nextUserId) {
      this.currentUserId = null;
      this.cartCount = 0;
      this.orderCount = 0;
      return;
    }

    if (this.currentUserId !== nextUserId) {
      this.currentUserId = nextUserId;
      this._cart.getcart(nextUserId).subscribe({
        error: () => {
          this.cartCount = 0;
        }
      });

      if (isAdmin) {
        this._order.allCart().subscribe({
          error: () => {
            this.orderCount = 0;
          }
        });
      } else {
        this.orderCount = 0;
      }
    }
  }

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.router.navigate(['/products/list'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/products/list']);
    }
  }
}
