import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5 mt-md-5 text-center min-vh-100 d-flex flex-column justify-content-center pt-5 pt-md-2" style="font-family: 'Inter', sans-serif;">
      <div class="row justify-content-center w-100 m-0">
        <div class="col-lg-7 col-md-9">
          <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 scale-up-center bg-white border-top border-5 border-success">
            <div class="mb-4">
              <div class="icon-circle bg-success-subtle text-success d-inline-flex align-items-center justify-content-center mx-auto rounded-circle" style="width: 120px; height: 120px;">
                <i class="bi bi-check-lg" style="font-size: 5rem;"></i>
              </div>
            </div>
            <h1 class="fw-bold mb-3 display-5 text-dark">Commande Confirmée !</h1>
            <p class="text-muted fs-5 mb-4 px-md-4">Merci pour votre confiance. Votre commande <strong class="text-primary fw-bold">#CMD-{{ orderNumber }}</strong> a bien été enregistrée et sera traitée dans les plus brefs délais.</p>
            <p class="text-secondary small mb-5 px-md-5">Un email de confirmation contenant la facture et le suivi de livraison vous sera envoyé d'ici quelques instans.</p>
            
            <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-2">
              <a routerLink="/products/list" class="btn btn-primary btn-lg rounded-pill px-4 fw-bold shadow-sm order-2 order-sm-1"><i class="bi bi-bag me-2"></i>Continuer mes achats</a>
              <a routerLink="/profile" class="btn btn-outline-secondary btn-lg rounded-pill px-4 fw-bold order-1 order-sm-2"><i class="bi bi-person me-2"></i>Mon profil</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .scale-up-center {
      animation: scaleUpCenter 0.6s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    }
    @keyframes scaleUpCenter {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .icon-circle {
      animation: popIn 0.5s ease-out 0.2s both;
    }
    @keyframes popIn {
      0% { transform: scale(0); opacity: 0; }
      80% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
  `]
})
export class OrderSuccessComponent {
  orderNumber = this.randomOrderNum();

  randomOrderNum() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
