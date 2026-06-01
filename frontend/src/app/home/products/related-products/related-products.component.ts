import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/services/product';
import { Router, RouterModule } from '@angular/router';
import { Carts } from '../../../core/services/carts';
import { Auth } from '../../../core/auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent {

  allProducts : any;

  constructor(
    private product: Product,
    private _cart: Carts,
    private _auth: Auth,
    private cdr: ChangeDetectorRef,
    private router: Router
  ){};

  ngOnInit():void{
    this.product.list().subscribe({
      next: (res)=>{
        this.allProducts = res;
        this.cdr.detectChanges()
      }
    })
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
