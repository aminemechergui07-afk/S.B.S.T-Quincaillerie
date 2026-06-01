import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Board } from '../../../core/services/board';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit {

  @Input() product = '';
  user: any;
  starsArray = [1, 2, 3, 4, 5];
  reviewsList: any[] = [];

  // زدنا متغيرات باش نشدو فيهم الحسابات
  averageRating: number = 0;
  totalReviews: number = 0;

  reviewData = {
    message: '',
    stars: 0,
    product: '',
    userId: ''
  };

  editingReviewId: string | null = null;
  editReviewData = {
    message: '',
    stars: 0
  };

  constructor(private _board: Board, private _auth: Auth, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.user = this._auth.getDataFromToken();
   
    if(this.user) {
      this.reviewData.userId = this.user._id;
    }
    this.reviewData.product = this.product;

    this.getReviews();
  }

  getReviews() {
    this._board.byId(this.product).subscribe({
      next: (res: any) => {
        this.reviewsList = res;
        this.calculateStats(); // نحسبو المعدل وعدد الكومنتارات
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur loading reviews:', err);
      }
    });
  }

  // فانكسيون جديدة تحسبلنا المعدل
  calculateStats() {
    this.totalReviews = this.reviewsList.length;
    if (this.totalReviews > 0) {
      const sum = this.reviewsList.reduce((acc, curr) => acc + curr.stars, 0);
      this.averageRating = sum / this.totalReviews;
    } else {
      this.averageRating = 0;
    }
  }

  setRating(val: number) {
    this.reviewData.stars = val;
  }

  submitReview() {
    if (!this.user) {
      alert('Veuillez vous connecter pour publier un avis.');
      return;
    }

    const messageTrimmed = this.reviewData.message.trim();

    if(this.reviewData.stars === 0 || messageTrimmed === '') {
      alert("Veuillez écrire un commentaire valide et choisir une note.");
      return;
    }

    this.reviewData.message = messageTrimmed;
    this.reviewData.product = this.product;
    if(this.user) {
      this.reviewData.userId = this.user._id;
    }

    this._board.create(this.reviewData).subscribe({
      next: (res) => {
        console.log('Avis ajouté !', res);

        this.reviewData.message = '';
        this.reviewData.stars = 0;
        this.getReviews();
      },
      error: (err) => {
        console.error('Erreur API:', err);
      }
    });
  }

  enableEdit(review: any) {
    this.editingReviewId = review._id;
    this.editReviewData.message = review.message;
    this.editReviewData.stars = review.stars;
  }

  setEditRating(val: number) {
    this.editReviewData.stars = val;
  }

  cancelEdit() {
    this.editingReviewId = null;
    this.editReviewData = { message: '', stars: 0 };
  }

  updateReview(reviewId: string) {
    const messageTrimmed = this.editReviewData.message.trim();

    if(this.editReviewData.stars === 0 || messageTrimmed === '') {
      alert("Veuillez écrire un commentaire valide et choisir une note.");
      return;
    }

    const payload = {
      message: messageTrimmed,
      stars: this.editReviewData.stars
    };

    this._board.update(reviewId, payload).subscribe({
      next: (res) => {
        console.log('Avis mis à jour !', res);
        this.cancelEdit();
        this.getReviews();
      },
      error: (err) => {
        console.error('Erreur API Update:', err);
      }
    });
  }
}
