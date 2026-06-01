import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../core/services/product';
import Swal from 'sweetalert2';
import { Carts } from '../../../core/services/carts';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-list-product',
  imports: [RouterModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {
  allProducts: any[] = [];
  products: any[] = [];
  user: any;
  searchQuery: string = '';

  constructor(
    private _product: Product,
    private _cart: Carts,
    private _auth: Auth,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._product.list().subscribe({
      next: (res: any) => {
        this.allProducts = res;
        this.filterProducts();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Product',
          text: err.error.message,
        });
      },
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.filterProducts();
    });

    this.user = this._auth.getDataFromToken();
  }

  filterProducts() {
    if (!this.allProducts || this.allProducts.length === 0) return;
    
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      this.products = this.allProducts.filter(p => 
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.marque && p.marque.toLowerCase().includes(query))
      );
    } else {
      this.products = [...this.allProducts];
    }
    this.cdr.detectChanges();
  }

  deleteProduct(id: any) {
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
        this._product.deleteProduct(id).subscribe({
          next: (res) => {
            this.ngOnInit();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Team Not Delete',
              text: err.error.message,
            });
          },
        });
      }
    });
  }

  addToCart(product: any) {
    let user = this._auth.getDataFromToken();
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Inscription requise',
        text: 'Pour commander un produit, veuillez creer un compte.',
        confirmButtonText: "S'inscrire",
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/register'], {
            queryParams: { returnUrl: this.router.url },
          });
        }
      });
      return;
    }

    let cartData = {
      userId: user._id,
      productId: product._id,
      quantity: 1
    };

    this._cart.create(cartData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajouté au panier',
          text: 'Produit ajouté avec succès',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire('Erreur', 'Erreur lors de l\'ajout au panier', 'error');
      }
    });
  }
}

