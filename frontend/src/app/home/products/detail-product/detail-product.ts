import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { RelatedProductsComponent } from '../related-products/related-products.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/services/product';
import { Carts } from '../../../core/services/carts';
import { Auth } from '../../../core/auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, ProductReviewsComponent, RelatedProductsComponent],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct {
  products: any;
  id: any;
  selectedImage: string = '';

  constructor(
    private _act: ActivatedRoute,
    private _product: Product,
    private _cart: Carts,
    private _auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this._act.snapshot.paramMap.get('id');
    this._product.preview(this.id).subscribe({
      next: (res) => {
        this.products = res;

        if (this.products.images && this.products.images.length > 0) {
          this.selectedImage = this.products.images[0];
        }

        this.cdr.detectChanges();
      },
    });
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  addToCart(product: any) {
    const user = this._auth.getDataFromToken();

    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Inscription requise',
        text: 'Pour commander ce produit, veuillez creer un compte.',
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

    const cartData = {
      userId: user._id,
      productId: product._id,
      quantity: 1,
    };

    this._cart.create(cartData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Ajoute au panier',
          text: 'Produit ajoute avec succes',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: () => {
        Swal.fire('Erreur', "Erreur lors de l'ajout au panier", 'error');
      },
    });
  }
}
